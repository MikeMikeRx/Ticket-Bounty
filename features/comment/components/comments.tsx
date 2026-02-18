import { CardCompact } from "@/components/card-compact";
import { CommentCreateForm } from "./comment-create-form";
import { CommentItem } from "./comment-item";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentWithMetaData } from "../types";

type CommentsProps = {
    ticketId: string;
    comments?: CommentWithMetaData[];
};

const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
    return (
        <>
            <CardCompact
                title="Create Comment"
                description="A new comment will be created"
                content={<CommentCreateForm ticketId={ticketId} />}
            />

            <div className="flex flex-col gap-y-2 ml-8">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        buttons={[
                            ...(comment.isOwner
                            ? [<CommentDeleteButton key="0" id={comment.id} />]
                            : []),
                        ]}
                    />
                ))}  
            </div>
        </>
    );
};

export { Comments };