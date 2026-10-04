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
  beforeAlt: "Tesla curb rash repair in a Las Vegas driveway, before",
  afterAlt: "Tesla curb rash repair in a Las Vegas driveway, after",
  caption: "Tesla, Las Vegas. Wheel stayed on.",
  to: "/tesla-wheel-repair",
  link: "Tesla wheel repair",
};

export const GLOSS_BLACK_HONDA_JOB: WorkJob = {
  before: "/work/gloss-black-honda-wheel-curb-rash-repair-before-las-vegas.jpg",
  after: "/work/gloss-black-honda-wheel-curb-rash-repair-after-las-vegas.jpg",
  beforeAlt: "Gloss black Honda wheel with curb rash before repair, Las Vegas",
  afterAlt: "Gloss black Honda wheel after curb rash repair, Las Vegas",
  caption: "Gloss black Honda wheel. Rash around the lip, before and after.",
};

export const SILVER_TESLA_JOB: WorkJob = {
  before: "/work/silver-tesla-wheel-curb-rash-repair-before-las-vegas.jpg",
  after: "/work/silver-tesla-wheel-curb-rash-repair-after-las-vegas.jpg",
  beforeAlt: "Silver Tesla wheel with curb rash before repair, Las Vegas",
  afterAlt: "Silver Tesla wheel after curb rash repair, Las Vegas",
  caption: "Silver Tesla wheel. Rash around the lip, before and after.",
};

export const TWO_TONE_HONDA_JOB: WorkJob = {
  before: "/work/two-tone-honda-wheel-curb-rash-repair-before-las-vegas.jpg",
  after: "/work/two-tone-honda-wheel-curb-rash-repair-after-las-vegas.jpg",
  beforeAlt: "Two-tone Honda wheel with curb rash on the lip before repair, Las Vegas",
  afterAlt: "Two-tone Honda wheel after curb rash repair, Las Vegas",
  caption: "Two-tone Honda wheel. Rash along the lip edge, before and after.",
  position: "object-top",
};

export const BLACK_HONDA_JOB: WorkJob = {
  before: "/work/black-honda-wheel-rim-scuff-repair-before-las-vegas.jpg",
  after: "/work/black-honda-wheel-rim-scuff-repair-after-las-vegas.jpg",
  beforeAlt: "Black Honda wheel with a scuffed lip before rim repair, Las Vegas",
  afterAlt: "Black Honda wheel after rim scuff repair, Las Vegas",
  caption: "Black Honda wheel on a blue car. Scuffed lip, before and after.",
};

export const MACHINED_WHEEL_JOB: WorkJob = {
  before: "/work/machined-wheel-gouge-repair-before-las-vegas.jpg",
  after: "/work/machined-wheel-gouge-repair-after-las-vegas.jpg",
  beforeAlt: "Two-tone machined wheel with a deep gouge, off the car, before repair, Las Vegas",
  afterAlt: "Two-tone machined wheel after gouge repair, off the car, Las Vegas",
  caption: "Two-tone machined wheel, off the car. Deep gouge on the face, before and after.",
};

/** Home page gallery: on-car jobs. */
export const HOME_JOBS: readonly WorkJob[] = [
  TESLA_JOB,
  GLOSS_BLACK_HONDA_JOB,
  SILVER_TESLA_JOB,
  TWO_TONE_HONDA_JOB,
  BLACK_HONDA_JOB,
];

/** Every real job on the /work page. */
export const WORK_JOBS: readonly WorkJob[] = [...HOME_JOBS, MACHINED_WHEEL_JOB];
