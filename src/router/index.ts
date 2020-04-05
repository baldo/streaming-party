import Vue from "vue";
import VueRouter, {
  NavigationGuard,
  RawLocation,
  Route,
  RouteConfig,
} from "vue-router";
import CreatePartyPage from "@/components/CreatePartyPage.vue";
import CheckStreamPage from "@/components/CheckStreamPage.vue";
import PartyLinkPage from "@/components/PartyLinkPage.vue";
import JoinPartyPage from "@/components/JoinPartyPage.vue";
import ErrorPage from "@/components/ErrorPage.vue";
import { ErrorType, Party, PARTY_CONSTRAINTS } from "@/types";
import { Dictionary, RoutePropsFunction } from "vue-router/types/router";
import { isValid } from "@/utils/validation";

Vue.use(VueRouter);

function stringFromQuery(route: Route, field: string): string {
  const value = route.query[field];
  return typeof value === "string" ? value : "";
}

enum PartyQueryField {
  JITSI_SERVER_URL_FIELD = "jitsi_server_url",
  JITSI_ROOM_FIELD = "jitsi_room",
  STREAM_URL_FIELD = "stream_url",
}

function hasPartyQuery(route: Route): boolean {
  // Validation happens in page component. Here we just decide on routing.
  for (const field of Object.values(PartyQueryField)) {
    if (!stringFromQuery(route, field)) {
      return false;
    }
  }

  return true;
}

function partyFromQuery(route: Route): Party | null {
  const jitsiServerUrl = stringFromQuery(
    route,
    PartyQueryField.JITSI_SERVER_URL_FIELD
  );
  const jitsiRoomName = stringFromQuery(
    route,
    PartyQueryField.JITSI_ROOM_FIELD
  );
  const streamUrl = stringFromQuery(route, PartyQueryField.STREAM_URL_FIELD);

  if (jitsiServerUrl || jitsiRoomName || streamUrl) {
    return {
      jitsiServerUrl,
      jitsiRoomName,
      streamUrl,
    };
  }

  return null;
}

function errorTypeFromParams(route: Route): ErrorType {
  const param = route.params.type;
  for (const errorType of Object.values(ErrorType)) {
    if (errorType === param) {
      return errorType;
    }
  }

  return ErrorType.UNKNOWN;
}

function partyToQuery(party: Party): Dictionary<string> {
  return {
    [PartyQueryField.JITSI_SERVER_URL_FIELD]: party.jitsiServerUrl,
    [PartyQueryField.JITSI_ROOM_FIELD]: party.jitsiRoomName,
    [PartyQueryField.STREAM_URL_FIELD]: party.streamUrl,
  };
}

enum Page {
  CREATE_PARTY = "create-party",
  CHECK_STREAM = "check-stream",
  PARTY_LINK = "party-link",
  JOIN_PARTY = "join-party",
  ERROR = "error",
}

export function createPartyPage(party?: Party): RawLocation {
  const location: RawLocation = {
    name: Page.CREATE_PARTY,
  };

  if (party) {
    location.query = partyToQuery(party);
  }
  return location;
}

export function checkStreamPage(party: Party): RawLocation {
  return {
    name: Page.CHECK_STREAM,
    query: partyToQuery(party),
  };
}

export function partyLinkPage(party: Party): RawLocation {
  return {
    name: Page.PARTY_LINK,
    query: partyToQuery(party),
  };
}

function partyLinkPageFromRoute(route: Route): RawLocation {
  const party = partyFromQuery(route);
  if (party) {
    return partyLinkPage(party);
  }

  throw new Error("Expected party query params to be available, but got none.");
}

export function joinPartyPage(party: Party): RawLocation {
  return {
    name: Page.JOIN_PARTY,
    query: partyToQuery(party),
  };
}

export function errorPage(type: ErrorType): RawLocation {
  return {
    name: Page.ERROR,
    params: {
      type,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NextCallback = (
  to?: RawLocation | false | ((vm: Vue) => any) | void
) => void;

function validatePartyQuery(optional = false): NavigationGuard {
  return function (to: Route, from: Route, next: NextCallback): void {
    const party = partyFromQuery(to);
    if (optional && party === null) {
      next();
    } else if (isValid(party, PARTY_CONSTRAINTS)) {
      next();
    } else {
      next(errorPage(ErrorType.PARTY_VALIDATION));
    }
  };
}

function getPartyProps(optional = false): RoutePropsFunction {
  return function (route: Route): Record<string, any> {
    const party = partyFromQuery(route);
    if (party) {
      return { party };
    }
    if (optional) {
      return {};
    }

    throw new Error(
      "Expected party query params to be available, but got none."
    );
  };
}

const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: (route: Route): RawLocation =>
      hasPartyQuery(route) ? partyLinkPageFromRoute(route) : createPartyPage(),
  },
  {
    path: "/create",
    name: Page.CREATE_PARTY,
    component: CreatePartyPage,
    beforeEnter: validatePartyQuery(true),
    props: getPartyProps(true),
  },
  {
    path: "/check",
    name: Page.CHECK_STREAM,
    component: CheckStreamPage,
    beforeEnter: validatePartyQuery(),
    props: getPartyProps(),
  },
  {
    path: "/party",
    name: Page.PARTY_LINK,
    component: PartyLinkPage,
    beforeEnter: validatePartyQuery(),
    props: getPartyProps(),
  },
  {
    path: "/join",
    name: Page.JOIN_PARTY,
    component: JoinPartyPage,
    beforeEnter: validatePartyQuery(),
    props: getPartyProps(),
  },
  {
    path: "/error/:type",
    name: Page.ERROR,
    component: ErrorPage,
    props: (route: Route): { errorType: ErrorType } => ({
      errorType: errorTypeFromParams(route),
    }),
  },
  {
    path: "*",
    component: ErrorPage,
    props: (): { errorType: ErrorType } => ({
      errorType: ErrorType.NOT_FOUND,
    }),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
