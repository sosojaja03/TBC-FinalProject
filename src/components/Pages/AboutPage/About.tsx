import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Zap } from "lucide-react";
import { Button } from "../../ui/button";
import image from "../../../assets/1.png";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Header Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-amber-900 dark:text-amber-300">
            {t("About-Translation.About.Title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-amber-700 dark:text-amber-400">
            {t("About-Translation.About.Description")}
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20 flex flex-col gap-12 lg:flex-row">
          <div className="flex flex-col justify-center space-y-6 lg:w-1/2">
            <h2 className="font-serif text-3xl font-semibold text-amber-900 dark:text-amber-300">
              {t("About-Translation.About.Mission.Title")}
            </h2>
            <p className="text-lg leading-relaxed text-amber-700 dark:text-amber-400">
              {t("About-Translation.About.Mission.Description")}
            </p>
          </div>
          <div className="flex h-96 items-center justify-center overflow-hidden rounded-xl bg-white/80 shadow-lg dark:bg-gray-800/80 lg:w-1/2">
            <img
              src={image}
              alt="A cozy bookshelf filled with books"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-center font-serif text-3xl font-semibold text-amber-900 dark:text-amber-300">
            {t("About-Translation.whatWeOffer")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <Card className="border-amber-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-amber-800 dark:bg-amber-950">
              <CardHeader className="space-y-4">
                <BookOpen className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                <CardTitle className="font-serif text-xl text-amber-900 dark:text-amber-300">
                  {t("About-Translation.diverseCollection")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-400">
                  {t("About-Translation.diverseCollectionDesc")}
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="border-amber-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-amber-800 dark:bg-amber-950">
              <CardHeader className="space-y-4">
                <Users className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                <CardTitle className="font-serif text-xl text-amber-900 dark:text-amber-300">
                  {t("About-Translation.communityReviews")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-400">
                  {t("About-Translation.communityReviewsDesc")}
                </p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="border-amber-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-amber-800 dark:bg-amber-950">
              <CardHeader className="space-y-4">
                <Zap className="h-10 w-10 text-amber-600 dark:text-amber-400" />
                <CardTitle className="font-serif text-xl text-amber-900 dark:text-amber-300">
                  {t("About-Translation.easyShopping")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-400">
                  {t("About-Translation.easyShoppingDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-20 rounded-xl border border-amber-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-amber-800 dark:bg-amber-950">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-amber-900 dark:text-amber-300">
            {t("About-Translation.About.Story.Title")}
          </h2>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-amber-700 dark:text-amber-400">
              {t("About-Translation.About.Story.Description1")}
            </p>
            <p className="text-lg leading-relaxed text-amber-700 dark:text-amber-400">
              {t("About-Translation.About.Story.Description2")}
            </p>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="text-center">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-amber-900 dark:text-amber-300">
            {t("About-Translation.About.Community.Title")}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-700 dark:text-amber-400">
            {t("About-Translation.About.Community.Description")}
          </p>
          <Button className="bg-amber-600 px-8 py-2 text-white transition-colors hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-500 dark:hover:bg-amber-600 dark:focus:ring-amber-400">
            {t("About-Translation.About.Button")}
          </Button>
        </section>
      </div>
    </main>
  );
}
