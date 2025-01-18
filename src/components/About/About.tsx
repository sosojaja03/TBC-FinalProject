import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Zap } from "lucide-react";
import { Button } from "../ui/button";

export default function AboutPage() {
  return (
    <div className="container flex flex-col px-[210px] py-12">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold">About BookHaven</h1>
        <p className="text-xl text-muted-foreground">
          Discover your next great read, connect with fellow book lovers, and
          share your thoughts with our community.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12 mt-11 flex h-[432px] w-auto flex-col gap-12 lg:flex-row">
        <div className="h-[172px] w-[432px] py-32">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            At BookHaven, we aim to create a sanctuary for book enthusiasts.
            From timeless classics to contemporary masterpieces, we strive to
            offer something for everyone while fostering a love for reading.
          </p>
        </div>
        <div className="flex h-[432px] w-auto items-center justify-center bg-muted">
          <img
            src="https://g-zwkebgiacpe.vusercontent.net/placeholder.svg"
            alt="Bookshelf illustration"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="mb-12 text-center">
        <h2 className="mb-6 text-3xl font-bold">What We Offer</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <Card className="w-[276px]">
            <CardHeader className="flex flex-col items-start">
              <BookOpen color="#2196F3" className="h-10 w-10" />
              <CardTitle className="text-base">Diverse Collection</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-muted-foreground">
                Browse an extensive collection of genres, from fiction and
                fantasy to self-help and biographies.
              </p>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="w-[276px]">
            <CardHeader className="flex flex-col items-start">
              <Users color="#2196F3" className="h-10 w-10" />
              <CardTitle className="text-base">Community Reviews</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-muted-foreground">
                Read reviews and ratings from fellow readers, and share your
                thoughts on the books you've read.
              </p>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="w-[276px]">
            <CardHeader className="flex flex-col items-start">
              <Zap color="#2196F3" className="h-10 w-10" />
              <CardTitle className="text-base">Easy Shopping</CardTitle>
            </CardHeader>
            <CardContent className="text-left">
              <p className="text-sm text-muted-foreground">
                Add books to your cart with ease and enjoy a seamless checkout
                experience tailored for book lovers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="h-64 w-[864px] rounded-xl bg-gray-300 p-[32px] dark:bg-[#1f212880]">
        <h2 className="mb-4 text-3xl font-semibold">Our Story</h2>
        <p className="text-muted-foreground">
          Founded in 2023, BookHaven began with a vision to make books more
          accessible and reading more enjoyable. Over time, our passion for
          literature has brought together a diverse community of readers and
          writers.
        </p>
        <p className="mt-4 text-muted-foreground">
          Today, BookHaven is more than just a bookstore; it's a community that
          celebrates the magic of storytelling and the joy of discovering your
          next favorite book.
        </p>
      </section>

      <section className="mt-10 text-center">
        <h1 className="mb-4 text-3xl font-semibold">Join Our Community</h1>
        <p className="mb-6 text-muted-foreground">
          Whether you're a bookworm, a casual reader, or just exploring, we
          welcome you to join BookHaven. Let's embark on a literary journey
          together.
        </p>
        <Button className="bg-blue-500 px-8">Start Browsing</Button>
      </section>
    </div>
  );
}
