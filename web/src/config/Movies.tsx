export interface Movie {
  title: string;
  year: string;
  kind: 'film' | 'series';
  href?: string;
  note?: string;
}

export const moviesIntro = {
  heading: 'Movies',
  description: 'Films and shows that have inspired and entertained me.',
};

/** Edit this list with your own favourites. */
export const movies: Movie[] = [
  {
    title: 'Interstellar',
    year: '2014',
    kind: 'film',
    note: 'Still the best argument for practical effects and a loud theatre.',
  },
  {
    title: 'The Social Network',
    year: '2010',
    kind: 'film',
    note: 'The dialogue alone makes it rewatchable.',
  },
  {
    title: 'Breaking Bad',
    year: '2008',
    kind: 'series',
    note: 'A masterclass in letting consequences compound.',
  },
  {
    title: 'Mr. Robot',
    year: '2015',
    kind: 'series',
    note: 'The rare show where the terminal on screen is real.',
  },
  {
    title: '3 Idiots',
    year: '2009',
    kind: 'film',
    note: 'Comfort watch, and it aged better than it had any right to.',
  },
];
