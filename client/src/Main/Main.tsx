
import {
  ChevronRight,
  BookOpen,
  Users,
  Sparkles,
  TrendingUp,
  Check,
  Pencil,
} from 'lucide-react';

type Props = {
  icon: React.ReactElement;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: Props) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <div className="flex flex-col items-start sm:items-center gap-4">
        <div className="mb-2 sm-mx:mb-0">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
            {title}
          </h3>
          <p className="text-slate-600 text-sm md:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center md:py-20 lg:py-24">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Transform Your Writing Journey
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 max-w-3xl">
            Unleash your creativity with AI-powered writing assistance,
            character development, and story generation tools.
          </p>
          <div className="flex flex-col sm-mx:flex-col justify-center gap-4 w-full sm:w-auto">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center hover:bg-purple-700 transition w-full ">
              Get Started <ChevronRight className="ml-2" size={20} />
            </button>
            <button className="border border-slate-300 px-6 py-3 rounded-lg font-semibold text-slate-700 flex items-center justify-center hover:bg-slate-50 transition w-full sm-mx:w-auto">
              See How It Works
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-12">
          Everything You Need to Write Better Stories
        </h2>
        <div className="lg:grid  lg:grid-cols-3 gap-6 md:gap-8 sm-mx:flex sm-mx:flex-col sm:w-auto ">
          <FeatureCard
            icon={<Sparkles className="text-purple-600" size={24} />}
            title="AI Plot Generation"
            description="Generate unique story plots and twists with advanced AI algorithms trained on successful narratives."
          />
          <FeatureCard
            icon={<Users className="text-purple-600" size={24} />}
            title="Character Development"
            description="Create deep, memorable characters with AI-powered personality traits and background generation."
          />
          <FeatureCard
            icon={<Pencil className="text-purple-600" size={24} />}
            title="Style Analysis"
            description="Get personalized feedback on your writing style and suggestions for improvement."
          />
          <FeatureCard
            icon={<BookOpen className="text-purple-600" size={24} />}
            title="Collaborative Spaces"
            description="Write and edit together in real-time with other writers in dedicated workspaces."
          />
          <FeatureCard
            icon={<Check className="text-purple-600" size={24} />}
            title="Smart Editing"
            description="Automated proofreading and editing suggestions to polish your work to perfection."
          />
          <FeatureCard
            icon={<TrendingUp className="text-purple-600" size={24} />}
            title="Market Insights"
            description="Stay ahead with AI-powered analysis of current market trends in your genre."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Start Writing Your Next Masterpiece Today
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who are already using our platform to
            create amazing stories.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-purple-700 transition w-full sm:w-auto">
            Begin Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;