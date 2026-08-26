import { useClient } from "sanity";
import type { DocumentActionComponent, DocumentActionDescription } from "sanity";
import { ArchiveIcon, CheckmarkCircleIcon, RestoreIcon } from "@sanity/icons";

import { apiVersion } from "../env";

type Status = "new" | "read" | "done";

/**
 * One-click status buttons on a submission, so following up on a message is a
 * single action rather than a trip through the fields. Submissions use
 * `liveEdit`, so the patch lands straight on the document — there is no draft
 * to publish afterwards.
 */
function statusAction(config: {
  target: Status;
  hideFor: Status[];
  label: string;
  icon: DocumentActionDescription["icon"];
  tone?: DocumentActionDescription["tone"];
}): DocumentActionComponent {
  const Action: DocumentActionComponent = (props) => {
    const client = useClient({ apiVersion });
    const doc = (props.published ?? props.draft) as { status?: Status } | null;

    if (!doc || config.hideFor.includes(doc.status ?? "new")) return null;

    return {
      label: config.label,
      icon: config.icon,
      tone: config.tone,
      onHandle: async () => {
        await client.patch(props.id).set({ status: config.target }).commit();
        props.onComplete();
      },
    };
  };

  return Action;
}

export const submissionActions: DocumentActionComponent[] = [
  statusAction({
    target: "read",
    hideFor: ["read", "done"],
    label: "Markeer als gelezen",
    icon: CheckmarkCircleIcon,
    tone: "primary",
  }),
  statusAction({
    target: "done",
    hideFor: ["done"],
    label: "Afgehandeld",
    icon: ArchiveIcon,
    tone: "positive",
  }),
  statusAction({
    target: "new",
    hideFor: ["new"],
    label: "Terug naar nieuw",
    icon: RestoreIcon,
  }),
];
