import BlogCard, { BlogCardProps } from './BlogCard';

export default {
  args: {
    image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    title: 'In Colombia, a Leftist and a Right-Wing Populist Head',
    description: 'The results in the first round of voting delivered a stunning blow to Colombia’s dominant conservative political class.',
    date: 'May 27, 2022',
    category: 'VICTIMS',
  },
  title: 'Blog Card',
};

export const Usage = (args: BlogCardProps) => <BlogCard {...args} />;
