import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@solidcn/core";
import { DocPage } from "../../../components/ui/DocPage.js";

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

export default function TablePage() {
  return (
    <DocPage
      docPath="/docs/components/table"
      title="Table"
      description="A responsive table component for displaying structured data with header, body, and footer sections."
      phase="Layout & Form"
      componentName="table"
      manualInstall="npm install @solidcn/core"
      usage={`import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell class="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      examples={[
        {
          title: "Default",
          preview: (
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead class="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow>
                    <TableCell class="font-medium">{inv.invoice}</TableCell>
                    <TableCell>{inv.status}</TableCell>
                    <TableCell>{inv.method}</TableCell>
                    <TableCell class="text-right">{inv.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell class="text-right">$1,750.00</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ),
          code: `import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "~/components/ui/table"

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
]

export function TableDefault() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead class="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow>
            <TableCell class="font-medium">{inv.invoice}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell class="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell class="text-right">$1,750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}`,
        },
      ]}
      props={[
        {
          name: "class",
          type: "string",
          description: "Additional CSS classes on the table element",
        },
      ]}
    />
  );
}
