export type ProfileFields = {
  id: string;
  date: string;
  name: string;
  birth: string;
  death: string;
  convicted_date: string;
  shortUrl: string;
  nickname: string;
  nationality: string;
  quote: string;
  victims: string;
  type: string;
  method: string;
  bio: string;
  status: string;
  murderStory: string;
  media: string[];
  killerDate: string[];
  knowsAbout: string[];
  year: number;
  day: number;
  month: number;
  date_description: string;
};

export type Nationality = {
  "@type": "Country";
  name: string;
};

export type JsonLdSchema = {
  "@context": "https://schema.org";
  "@type": "Person";
  identifier: string;
  name: string;
  alternateName: string | null;
  nationality: Nationality;
  description?: string;
  knowsAbout?: string[];
  subjectOf: {
    "@type": "Thing";
    name: string;
  };
  numberOfVictims: string;
  image: string[];
};

type Category = { id: number; name: string; slug: string };
type MediaItem = { id?: number; url?: string; full_url?: string; order?: number };

export type NewsHeadlineSchema = {
    id: number;
    title: string;
    slug: string;
    featured_photo?: string | null;
    featured_photo_url?: string | null;
    published_at: string;
    category?: Category | null;
    media?: MediaItem[];
};

export type Profile = Omit<ProfileFields, 'quote'> & {
  markup?: JsonLdSchema;
};

export type ProfileCard = Pick<ProfileFields, 'id' | 'date' | 'name' | 'media' | 'shortUrl' | 'birth' | 'death' | 'convicted_date' | 'year' | 'month' | 'day' | 'date_description'>;

export type Event = Pick<ProfileFields, 'id' | 'date' | 'name' | 'media' | 'shortUrl' | 'birth' | 'death' | 'type' | 'killerDate' | 'year' | 'month' | 'day' | 'date_description'>;

export type ProfileQuote = Pick<ProfileFields, 'id' | 'date' | 'name' | 'nickname' | 'media' | 'quote' | 'shortUrl' | 'birth' | 'death'>;

export type ProfileSearchResult = Pick<ProfileFields, 'id' | 'name' | 'nickname' | 'media' | 'type' | 'shortUrl'>;

export type ProfilesList = Pick<ProfileFields, 'id' | 'name' | 'shortUrl' | 'date' | 'nickname' | 'victims' | 'birth' | 'death' | 'nationality'>;

export type NewsHeadline = Pick<NewsHeadlineSchema, 'id' | 'title' | 'slug' | 'featured_photo' | 'featured_photo_url' | 'published_at' | 'category' | 'media'>;

export type NewsItem = {
    id: number;
    title: string;
    slug: string;
    article: string; // HTML from CKEditor
    featured_photo_url?: string | null;
    published_at: string;
    category?: Category | null;
    media?: MediaItem[];
};

export type Headline = {
    id: number;
    title: string;
    slug: string;
    featured_photo_url?: string | null;
    published_at: string;
    category?: Category | null;
    media?: MediaItem[];
};