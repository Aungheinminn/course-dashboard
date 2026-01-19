import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const AssessmentTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-300">
          <TableHead>Title</TableHead>
          <TableHead>Questions</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Created Date</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border-gray-300">
          <TableCell>Math 101</TableCell>
          <TableCell>18 Questions</TableCell>
          <TableCell>Published</TableCell>
          <TableCell className="text-center">2023-01-01</TableCell>
          <TableCell className="flex justify-center items-center">
            <Button className="bg-white border border-blue-600 text-blue-600 hover:bg-white hover:border-blue-700 hover:text-blue-700 rounded-full cursor-pointer">
              View
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Math 101</TableCell>
          <TableCell>16 Questions</TableCell>
          <TableCell>Published</TableCell>
          <TableCell className="text-center">2023-01-01</TableCell>
          <TableCell className="flex justify-center items-center">
            <Button className="bg-white border border-blue-600 text-blue-600 hover:bg-white hover:border-blue-700 hover:text-blue-700 rounded-full cursor-pointer">
              View
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
