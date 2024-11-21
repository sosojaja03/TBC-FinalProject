import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Zap } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutPage() {
  return (
    <div className="container flex flex-col px-[210px] py-12">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">About bitBlogs</h1>
        <p className="text-xl text-muted-foreground">
          Empowering tech enthusiasts to share knowledge and inspire innovation.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12 mt-11 flex h-[432px] w-auto flex-col gap-12 lg:flex-row">
        <div className="h-[172px] w-[432px] py-32">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            At bitBlogs, we believe in the power of shared knowledge. Our
            mission is to create a platform where tech enthusiasts, developers,
            and innovators can come together to share ideas, learn from each
            other, and push the boundaries of what's possible in the world of
            technology.
          </p>
        </div>
        <div className="flex h-[432px] w-auto items-center justify-center bg-muted">
          <img
            src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg"
            alt="#"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="mb-12 text-center">
        <h2 className="mb-6 text-3xl font-bold">What We Offer</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card className="w-[200px]" 1 */}
          <Card className="w-[276px]">
            <CardHeader className="flex flex-col items-start">
              <BookOpen color="#2196F3" className="h-10 w-10" /> {/* Icon */}
              <CardTitle className="text-base">Rich Content</CardTitle>
              {/* Title below icon */}
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-muted-foreground">
                Access a wide range of articles, tutorials, and insights on the
                latest tech trends and best practices.
              </p>
            </CardContent>
          </Card>

          {/* Card className="w-[200px]" 2 */}
          <Card className="w-[276px]">
            <CardHeader className="flex flex-col items-start">
              <Users color=" #2196F3" className="h-10 w-10" />
              <CardTitle className="text-base">Vibrant Community</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-muted-foreground">
                Connect with like-minded individuals, share your knowledge, and
                grow your professional network.
              </p>
            </CardContent>
          </Card>
          {/* Card className="w-[200px]" 3 */}
          <Card className="w-[276px]">
            <CardHeader className="flex flex-col items-start">
              <Zap color=" #2196F3" className="h-10 w-10" />
              <CardTitle className="text-base">Cutting-edge Topics</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-muted-foreground">
                Stay ahead of the curve with content covering emerging
                technologies and innovative solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="h-64 w-[864px] rounded-xl bg-gray-300 p-[32px] dark:bg-[#1f212880]">
        <h2 className="mb-4 text-3xl font-semibold">Our Story</h2>
        <p className="text-muted-foreground">
          Founded in 2023, bitBlogs started as a small project by a group of
          passionate developers who wanted to create a space for sharing their
          experiences and learning from others. What began as a simple blog
          quickly grew into a thriving community of tech leaders from all around
          the world.
        </p>
        <p className="mt-4 text-muted-foreground">
          Today, bitBlogs is proud to be a leading platform for
          technology-focused content, fostering innovation and collaboration in
          the ever-evolving world of tech.
        </p>
      </section>

      <section className="mt-10 text-center">
        <h1 className="mb-4 text-3xl font-semibold">Join Us on Our Journey</h1>
        <p className="mb-6 text-muted-foreground">
          Whether you're a seasoned developer, a curious beginner, or somewhere
          in between, there's a place for you at bitBlogs. Let's shape the
          future of technology together.
        </p>
        <Button className="bg-blue-500 px-8">Get Started Today </Button>
      </section>
    </div>
  );
}
