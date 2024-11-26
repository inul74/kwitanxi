"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SubmitButton } from "./SubmitButtons";

export function CreateInvoice() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form>
          <input type="hidden" name={""} value={""} />
          <input type="hidden" name={""} value={""} />

          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input placeholder="Test 123" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input className="rounded-l-none" placeholder="5" />
              </div>
            </div>
            <div>
              <Label>Currency</Label>
              <Select defaultValue="USD">
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                  <SelectItem value="IDR">Rupiah -- Rp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label>From</Label>
              <div className="space-y-1">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" />
                <Input placeholder="Your Address" />
              </div>
            </div>
            <div>
              <Label>To</Label>
              <div className="space-y-1">
                <Input placeholder="Client Name" />
                <Input placeholder="Client Email" />
                <Input placeholder="Client Address" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("id-ID", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    // fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Invoice Due</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on receipt</SelectItem>
                  <SelectItem value="7">Net 7</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 gap-4 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea placeholder="Item name & description" />
              </div>
              <div className="col-span-2">
                <Input type="number" placeholder="0" />
              </div>
              <div className="col-span-2">
                <Input type="number" placeholder="0" />
              </div>
              <div className="col-span-2">
                <Input placeholder="0" disabled />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>0</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total</span>
                <span className="font-semibold underline underline-offset-4">
                  0
                </span>
              </div>
            </div>
          </div>

          <div>
            <Label>Note</Label>
            <Textarea placeholder="Add your Note/s right here..." />
          </div>
          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
