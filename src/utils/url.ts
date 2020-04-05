import { Party } from "@/types";

export function jitsiRoomUrl(party: Party): string {
  const jitsiServerUrl = party.jitsiServerUrl.endsWith("/")
    ? party.jitsiServerUrl.substr(0, party.jitsiServerUrl.length - 1)
    : party.jitsiServerUrl;
  return jitsiServerUrl + "/" + encodeURIComponent(party.jitsiRoomName);
}
