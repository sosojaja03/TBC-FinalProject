import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";

const featuredAuthors = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Blockchain Enthusiast",
    image: "/images/alice.jpg", // Replace with actual image paths
    bio: "Alice is passionate about blockchain and decentralized systems.",
    skills: ["Blockchain", "Cryptocurrency", "DeFi"],
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Crypto Analyst",
    image: "/images/bob.jpg",
    bio: "Bob specializes in analyzing cryptocurrency markets.",
    skills: ["Crypto Analysis", "Trading", "Market Research"],
  },
  {
    id: "3",
    name: "Carol Williams",
    role: "Tech Journalist",
    image: "/images/carol.jpg",
    bio: "Carol writes about emerging technologies and their impact.",
    skills: ["Journalism", "Tech Reviews", "Blockchain"],
  },
];

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

const AuthorPage = () => {
  const { authorId } = useParams();
  const { t } = useTranslation();

  // Find the author based on the authorId
  const author = featuredAuthors.find((author) => author.id === authorId);

  if (!author) {
    return (
      <Card className="mx-auto my-8 max-w-3xl">
        <CardHeader>
          <CardTitle>Author Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The requested author does not exist.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card className="mb-12 flex items-center rounded-lg bg-card p-8 shadow-lg md:flex-row md:items-start">
        <CardHeader className="flex flex-grow flex-row items-start space-x-4 text-center md:text-left">
          <Avatar className="relative mb-4 flex h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-primary md:mb-0 md:mr-8">
            <AvatarImage src={author.image} alt={author.name} />
            <AvatarFallback>
              {author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow text-center md:text-left">
            <CardTitle className="mb-2 text-3xl font-bold">
              {author.name}
            </CardTitle>
            {/* <p className="text-muted-foreground">{author.role}</p> */}
            <p className="mb-4text-muted-foreground text-muted-foreground">
              Tech enthusiast, software engineer, and avid blogger. Passionate
              about AI, web development, and the future of technology.
            </p>
          </div>
          <div className="mb-4 flex justify-center space-x-4 md:justify-start">
            <button className="[&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 inline-flex h-9 w-9 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-twitter h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </button>
          </div>
        </CardHeader>
      </Card>
      <Card className="mx-auto my-8 max-w-3xl border-0">
        <CardContent className="p-6">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-8 grid h-9 w-full grid-cols-2 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              <TabsTrigger
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                value="articles"
              >
                Articles
              </TabsTrigger>
              <TabsTrigger
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                value="about"
              >
                About
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value="about"
            >
              <p>
                {/* {author.bio} */}
                Jane Doe is a seasoned software engineer with over a decade of
                experience in web development. She specializes in JavaScript,
                React, and Node.js, and has a keen interest in emerging
                technologies like AI and blockchain. Jane is a frequent speaker
                at tech conferences and contributes to various open-source
                projects.
              </p>
              <h3 className="mb-3 mt-4 text-lg font-medium">Skills</h3>
              <ul className="flex gap-2">
                {author.skills.map((skill) => (
                  <li key={skill}>
                    <Badge className="rounded-full bg-blue-400 px-3 py-1 text-sm text-blue-900 hover:bg-blue-400 hover:text-blue-900 dark:bg-blue-600 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-blue-300">
                      Your Text Here
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="articles">
              {/* <p>Articles by {author.name}</p> */}
              <div className="space-y-6 bg-background text-foreground">
                {posts.map((post, index) => (
                  <Card
                    key={index}
                    className="border-gray-800 bg-background p-6"
                  >
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthorPage;
