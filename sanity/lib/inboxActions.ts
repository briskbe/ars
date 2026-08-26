import { useState } from "react";
import { useClient, useDocumentOperation } from "sanity";
import type {
  DocumentActionComponent,
  DocumentActionDescription,
} from "sanity";
import {
  ArchiveIcon,
  CheckmarkCircleIcon,
  RestoreIcon,
  TrashIcon,
} from "@sanity/icons";

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

/**
 * Deleting a message for good.
 *
 * Sanity ships a delete action, but it is labelled generically and sits in the
 * overflow menu where nobody finds it. This is the same underlying operation
 * with a name that says what it removes and a confirmation that says the
 * removal is permanent. `deleteOp.disabled` carries Sanity's own reason —
 * missing permissions, or nothing there to delete — so the button greys out
 * instead of failing when the action is genuinely unavailable.
 */
function deleteAction(
  noun: "Bericht" | "Sollicitatie",
): DocumentActionComponent {
  const Action: DocumentActionComponent = (props) => {
    const { delete: deleteOp } = useDocumentOperation(props.id, props.type);
    const [confirming, setConfirming] = useState(false);

    return {
      label: `${noun} verwijderen`,
      icon: TrashIcon,
      tone: "critical",
      disabled: Boolean(deleteOp.disabled),
      title:
        typeof deleteOp.disabled === "string"
          ? "Verwijderen is hier niet mogelijk"
          : undefined,
      onHandle: () => setConfirming(true),
      dialog: confirming && {
        type: "confirm",
        tone: "critical",
        message:
          noun === "Bericht"
            ? "Dit bericht definitief verwijderen? De inhoud van het contactformulier gaat verloren en dit kan niet ongedaan gemaakt worden."
            : "Deze sollicitatie definitief verwijderen? Het CV en alle gegevens van de sollicitant gaan verloren en dit kan niet ongedaan gemaakt worden.",
        confirmButtonText: "Definitief verwijderen",
        cancelButtonText: "Annuleren",
        onCancel: () => {
          setConfirming(false);
          props.onComplete();
        },
        onConfirm: () => {
          deleteOp.execute();
          setConfirming(false);
          props.onComplete();
        },
      },
    };
  };

  return Action;
}

/**
 * The action set shared by every inbox. `noun` only changes the wording of the
 * delete button and its confirmation, so a message and a job application each
 * say what they are rather than both saying "document".
 */
export function inboxActions(
  noun: "Bericht" | "Sollicitatie",
): DocumentActionComponent[] {
  return [
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
    deleteAction(noun),
  ];
}
