import { NextResponse } from "next/server";

import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "noreply@demomailtrap.com",
      name: "Admin KwintanXI",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "inuldev0@gmail.com" }],
      template_uuid: "75e50865-8f01-4fe5-8a24-d8bcfe88b69e",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "KwitanXI",
        company_info_address: "Fufufafa Land 088",
        company_info_city: "Wakanda City",
        company_info_zip_code: "12345",
        company_info_country: "Konoha",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
