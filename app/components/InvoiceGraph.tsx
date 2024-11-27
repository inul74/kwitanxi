import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { Graph } from "./Graph";
import { format, subDays, eachDayOfInterval } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getData(userId: string) {
  // Get date range for last 30 days
  const endDate = new Date();
  const startDate = subDays(endDate, 30);

  const paidInvoices = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: "PAID",
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      createdAt: true,
      currency: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Get unique currencies used
  const usedCurrencies = [
    ...new Set(paidInvoices.map((invoice) => invoice.currency)),
  ];

  // Create an array of all days in the period
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Initialize amounts for all days to zero (only for used currencies)
  const dailyAmounts = allDays.reduce((acc, date) => {
    const day = format(date, "MMM dd");
    acc[day] = usedCurrencies.reduce((currencies, currency) => {
      currencies[currency] = 0;
      return currencies;
    }, {} as Record<string, number>);
    return acc;
  }, {} as Record<string, Record<string, number>>);

  // Sum amounts for each day by currency
  paidInvoices.forEach((invoice) => {
    const day = format(invoice.createdAt, "MMM dd");
    const amount = invoice.invoiceItemQuantity * invoice.invoiceItemRate;
    dailyAmounts[day][invoice.currency] += amount;
  });

  // Convert to format needed for graph
  return {
    data: Object.entries(dailyAmounts).map(([day, amounts]) => ({
      name: day,
      ...amounts,
    })),
    currencies: usedCurrencies,
  };
}

export async function InvoiceGraph() {
  const session = await requireUser();
  const { data, currencies } = await getData(session.user?.id as string);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Graph data={data} currencies={currencies} />
      </CardContent>
    </Card>
  );
}
