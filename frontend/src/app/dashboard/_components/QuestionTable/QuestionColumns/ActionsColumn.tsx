"use client";

import { Question, QuestionSchema } from "@/types/Question";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { EditQuestionModal } from "../../Forms/EditQuestionModal";
import DeleteQuestionDialog from "../../Forms/DeleteQuestionDialog";
import { ManageTestCasesModal } from "../../Forms/ManageTestCasesModal";

const ActionsColumn: ColumnDef<Question> = {
  id: "Action",
  header: () => <div className="w-24 px-4 text-right">Actions</div>,
  cell: ({ row }) => ActionsColumnCell({ row }),
};

function ActionsColumnCell({ row }: { row: Row<Question> }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isManageTestCasesModalOpen, setIsManageTestCasesModalOpen] =
    useState(false);
  const question = QuestionSchema.parse(row.original);

  return (
    <div className="px-4 text-right">
      <DeleteQuestionDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        question={question}
      />
      <EditQuestionModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        question={question}
      />
      <ManageTestCasesModal
        isOpen={isManageTestCasesModalOpen}
        setIsOpen={setIsManageTestCasesModalOpen}
        question={question}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setIsEditModalOpen(true);
            }}
          >
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsManageTestCasesModalOpen(true);
            }}
          >
            Manage Test Cases
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ActionsColumn;
