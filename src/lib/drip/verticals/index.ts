// Registry of all Vertical Factory drip programs. The /api/drip cron scans
// the shared "Vertical Customers" audience and routes each contact to the
// vertical named by the [tag] in their last-name field.

import type { Vertical } from "./types";
import { TRADES } from "./01-trades";
import { RESTAURANTS } from "./02-restaurants";
import { SALONS } from "./03-salons";
import { SUPPLEMENTS } from "./04-supplements";
import { GYMS } from "./05-gyms";
import { AUTO } from "./06-auto";
import { HOME_SERVICES } from "./07-home-services";
import { MEDICAL } from "./08-medical";
import { ECOMMERCE } from "./09-ecommerce";

export { SHARED_VERTICAL_AUDIENCE_ID, parseVerticalTag } from "./types";
export type { Vertical, VerticalEmail } from "./types";

export const VERTICALS: Vertical[] = [
  TRADES,
  RESTAURANTS,
  SALONS,
  SUPPLEMENTS,
  GYMS,
  AUTO,
  HOME_SERVICES,
  MEDICAL,
  ECOMMERCE,
];

export function verticalByTag(tag: string): Vertical | undefined {
  return VERTICALS.find((v) => v.tag === tag);
}
