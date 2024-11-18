import { Card } from "../ui/card";
import { Trans, useTranslation } from "react-i18next";
const posts = [
  {
    title: "The Future of Blockchain Technology",
    author: "John Doe",
    date: "May 15, 2023",
    readTime: "5 min read",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
    tags: ["Blockchain", "Technology", "Future"],
  },
  {
    title: "Understanding Cryptocurrency Markets",
    author: "Alice Johnson",
    date: "May 14, 2023",
    readTime: "7 min read",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
    tags: ["Cryptocurrency", "Markets", "Analysis"],
  },
  {
    title: "Defi",
    author: "Alex Johnson",
    date: "May 20, 2023",
    readTime: "6 min read",
    excerpt:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aut illum, quis dolorem explicabo dignissimos suscipit enim sit doloribus, cum porro, error quia odio. Quasi rerum a sint minima aliquam. in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
    tags: ["Blockchain", "Technology", "Future"],
  },
];

const popularTags = [
  "Blockchain",
  "Cryptocurrency",
  "Technology",
  "Programming",
  "AI",
  "Machine Learning",
];

const featuredAuthors = [
  { name: "Alice Johnson", role: "Blockchain Enthusiast" },
  { name: "Bob Smith", role: "Crypto Analyst" },
  { name: "Carol Williams", role: "Tech Journalist" },
];

export const MainPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <main className="container mx-auto flex px-2 py-8">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_35px]">
        {/* Posts Column */}
        <div className="space-y-6 bg-background text-foreground">
          {posts.map((post, index) => (
            <Card key={index} className="border-gray-800 bg-background p-6">
              <div className="mb-4 aspect-auto h-60 rounded-lg bg-gray-500">
                <img
                  src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg"
                  alt="#"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <h2 className="mb-2 text-2xl font-bold">{post.title}</h2>
              <div className="mb-4 flex items-center text-sm text-gray-500">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <p className="mb-4 text-gray-500">{post.excerpt}</p>
              <div className="flex gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-gray-300 px-3 py-1 text-sm dark:bg-gray-800"
                  >
                    {t(`MainPage-Translation.tags.${tag}`, {
                      defaultValue: tag,
                    })}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* sidebar */}
      <div className="space-y-6">
        {/* Popular Tags */}
        <Card className="min-h-36 w-96 border-gray-800 bg-card p-4">
          <h3 className="mb-4 font-semibold">
            <Trans>MainPage-Translation.Popular Tags</Trans>
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <span
                key={index}
                className="rounded-lg bg-blue-500 px-3 py-1 text-sm"
              >
                {t(`MainPage-Translation.tags.${tag}`, {
                  defaultValue: tag,
                })}
              </span>
            ))}
          </div>
        </Card>

        {/* Featured Authors */}
        <Card className="w-96 border-gray-800 bg-card p-4">
          <h3 className="mb-4 font-semibold">
            <Trans>MainPage-Translation.Featured Authors</Trans>
          </h3>
          <div className="space-y-4">
            {featuredAuthors.map((author, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-800" />
                <div>
                  <div className="font-medium">{author.name}</div>
                  <div className="text-sm text-gray-400">{author.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};
