import type { ReferenceTypeState } from "features/profile/view/References";
import {
  AvailableWriteReferencesReq,
  ListReferencesReq,
  WriteFriendReferenceReq,
  WriteHostRequestReferenceReq,
} from "pb/references_pb";

import client from "./client";

const REFERENCES_PAGE_SIZE = 5;

interface GetReferencesBaseInput {
  userId: number;
  pageToken?: string;
}

interface GetAvailableReferencesBaseInput {
  userId: number;
}

interface WriteHostRequestReferenceBaseInput {
  hostRequestId: number;
  text: string;
  wasAppropriate: boolean;
  rating: number;
}

interface WriteFriendReferenceBaseInput {
  toUserId: number;
  text: string;
  wasAppropriate: boolean;
  rating: number;
}

type GetReferencesGivenInput = GetReferencesBaseInput;
type GetAvailableReferencesInput = GetAvailableReferencesBaseInput;
export type WriteHostRequestReferenceInput = WriteHostRequestReferenceBaseInput;
export type WriteFriendReferenceInput = WriteFriendReferenceBaseInput;

export async function getReferencesGivenByUser({
  userId,
  pageToken = "0",
}: GetReferencesGivenInput) {
  const req = new ListReferencesReq();
  req.setFromUserId(userId);
  req.setReferenceTypeFilterList([]);
  req.setPageSize(REFERENCES_PAGE_SIZE);
  req.setPageToken(pageToken);

  const res = await client.references.listReferences(req);
  return res.toObject();
}

interface GetReferencesReceivedInput extends GetReferencesBaseInput {
  referenceType: Exclude<ReferenceTypeState, "given">;
}

export async function getReferencesReceivedForUser({
  userId,
  pageToken = "0",
  referenceType,
}: GetReferencesReceivedInput) {
  const req = new ListReferencesReq();
  req.setToUserId(userId);
  req.setReferenceTypeFilterList(
    referenceType !== "all" ? [referenceType] : []
  );
  req.setPageSize(REFERENCES_PAGE_SIZE);
  req.setPageToken(pageToken);

  const res = await client.references.listReferences(req);
  return res.toObject();
}

export async function getAvailableReferences({
  userId,
}: GetAvailableReferencesInput) {
  const req = new AvailableWriteReferencesReq();
  req.setToUserId(userId);

  const res = await client.references.availableWriteReferences(req);
  return res.toObject();
}

export async function writeHostRequestReference({
  hostRequestId,
  text,
  wasAppropriate,
  rating,
}: WriteHostRequestReferenceInput) {
  const req = new WriteHostRequestReferenceReq();
  req.setHostRequestId(hostRequestId);
  req.setText(text);
  req.setWasAppropriate(wasAppropriate);
  req.setRating(rating);

  const res = await client.references.writeHostRequestReference(req);
  return res.toObject();
}

export async function writeFriendRequestReference({
  toUserId,
  text,
  wasAppropriate,
  rating,
}: WriteFriendReferenceInput) {
  const req = new WriteFriendReferenceReq();
  req.setToUserId(toUserId);
  req.setText(text);
  req.setWasAppropriate(wasAppropriate);
  req.setRating(rating);

  const res = await client.references.writeFriendReference(req);
  return res.toObject();
}
