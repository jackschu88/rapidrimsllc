export type WorkJob = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  caption: string;
  /** Tailwind object-position class when the damage sits off-center. */
  position?: string;
  to?: "/tesla-wheel-repair";
  link?: string;
};

/** Real RapidRims job photos. Before and after of the same wheel. */
export const TESLA_JOB: WorkJob = {
  before: "/work/tesla-before.jpg",
  after: "/work/tesla-after.jpg",
  beforeAlt: "Tesla curb rash repair in a customer's driveway, before",
  afterAlt: "Tesla curb rash repair in a customer's driveway, after",
  caption: "Tesla, Las Vegas. Wheel stayed on.",
  to: "/tesla-wheel-repair",
  link: "Tesla wheel repair",
};

export const GLOSS_BLACK_HONDA_JOB: WorkJob = {
  before: "/work/gloss-black-honda-wheel-curb-rash-repair-before.jpg",
  after: "/work/gloss-black-honda-wheel-curb-rash-repair-after.jpg",
  beforeAlt: "Gloss black Honda wheel with curb rash on the lip, before repair",
  afterAlt: "Gloss black Honda wheel after curb rash repair",
  caption: "Gloss black Honda wheel on a blue car. Curb rash on the lip, before and after.",
};

export const BLACK_ALLOY_HONDA_JOB: WorkJob = {
  before: "/work/black-alloy-honda-wheel-lip-rash-repair-before.jpg",
  after: "/work/black-alloy-honda-wheel-lip-rash-repair-after.jpg",
  beforeAlt: "Black alloy Honda wheel with lip rash, before repair",
  afterAlt: "Black alloy Honda wheel after lip rash repair",
  caption: "Black Honda wheel. Rash around the lip, before and after.",
};

export const SILVER_TESLA_JOB: WorkJob = {
  before: "/work/silver-tesla-wheel-curb-rash-repair-before.jpg",
  after: "/work/silver-tesla-wheel-curb-rash-repair-after.jpg",
  beforeAlt: "Silver Tesla wheel with curb rash, before repair",
  afterAlt: "Silver Tesla wheel after curb rash repair",
  caption: "Silver Tesla wheel. Rash around the lip, before and after.",
};

export const TWO_TONE_HONDA_JOB: WorkJob = {
  before: "/work/two-tone-honda-wheel-rim-scuff-repair-before.jpg",
  after: "/work/two-tone-honda-wheel-rim-scuff-repair-after.jpg",
  beforeAlt: "Two-tone Honda wheel with a scuffed lip, before repair",
  afterAlt: "Two-tone Honda wheel after rim scuff repair",
  caption: "Two-tone Honda wheel. Scuffed lip, before and after.",
  position: "object-top",
};

/** Real job photos, all with the wheel on the car. */
export const WORK_JOBS: readonly WorkJob[] = [
  TESLA_JOB,
  BLACK_ALLOY_HONDA_JOB,
  SILVER_TESLA_JOB,
  TWO_TONE_HONDA_JOB,
  GLOSS_BLACK_HONDA_JOB,
];
