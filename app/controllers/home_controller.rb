# frozen_string_literal: true

class HomeController < ApplicationController
  layout "home"

  before_action :set_meta_data
  before_action :set_layout_and_title

  JOBS = [
    {
      slug: "ai-engineer-team-lead",
      title: "AI Engineer and Team Lead",
      salary: "$250k+",
      type: "Full-time",
      location: "DUMBO | New York",
      category: "Engineering",
      responsibilities: [
        { title: "Velocity", description: "Optimize global checkout latency (aiming for <100ms)." },
        { title: "Infrastructure", description: "Scale our payout rails across Stripe, PayPal, and local bank networks." },
        { title: "Complexity", description: "Solve the \"hard math\" of global sales tax, VAT, and fraud prevention." },
        { title: "Independence", description: "Build the generative AI tools that help creators automate their commerce." }
      ],
      stack: [
        { name: "Backend", tech: "Ruby on Rails." },
        { name: "Frontend", tech: "JavaScript / React." },
        { name: "Data", tech: "Postgres / Redis." },
        { name: "Payments", tech: "Stripe, PayPal, and TaxCloud APIs." }
      ]
    },
    {
      slug: "senior-fullstack-engineer-checkout-payouts",
      title: "Senior Full-stack Engineer (Checkout & Payouts)",
      salary: "$200k+",
      type: "Full-time",
      location: "DUMBO | New York",
      category: "Engineering",
      responsibilities: [
        { title: "Velocity", description: "Optimize global checkout latency (aiming for <100ms)." },
        { title: "Infrastructure", description: "Scale our payout rails across Stripe, PayPal, and local bank networks." },
        { title: "Complexity", description: "Solve the \"hard math\" of global sales tax, VAT, and fraud prevention." },
        { title: "Independence", description: "Build the generative AI tools that help creators automate their commerce." }
      ],
      stack: [
        { name: "Backend", tech: "Ruby on Rails." },
        { name: "Frontend", tech: "JavaScript / React." },
        { name: "Data", tech: "Postgres / Redis." },
        { name: "Payments", tech: "Stripe, PayPal, and TaxCloud APIs." }
      ]
    },
    {
      slug: "senior-product-designer-creator-tools",
      title: "Senior Product Designer (Creator Tools)",
      salary: "$230k+",
      type: "Full-time",
      location: "DUMBO | New York",
      category: "Design",
      responsibilities: [
        { title: "Product vision", description: "Shape the future of creator tools through thoughtful design." },
        { title: "User research", description: "Understand creator needs and translate them into intuitive interfaces." },
        { title: "Design systems", description: "Maintain and evolve our design system for consistency." },
        { title: "Collaboration", description: "Work closely with engineers to ship beautiful, functional features." }
      ],
      stack: [
        { name: "Design", tech: "Figma." },
        { name: "Prototyping", tech: "Framer, Principle." },
        { name: "Frontend", tech: "HTML/CSS/Tailwind basics." }
      ]
    },
    {
      slug: "growth-community-manager",
      title: "Growth & Community Manager",
      salary: "$190k+",
      type: "Full-time",
      location: "DUMBO | New York",
      category: "Support",
      responsibilities: [
        { title: "Community", description: "Build and nurture our creator community." },
        { title: "Growth", description: "Identify and execute growth opportunities." },
        { title: "Content", description: "Create content that helps creators succeed." },
        { title: "Feedback", description: "Channel creator feedback to the product team." }
      ],
      stack: []
    },
    {
      slug: "creator-success-lead-nyc-hub",
      title: "Creator Success Lead (NYC Hub)",
      salary: "$210k+",
      type: "Full-time",
      location: "DUMBO | New York",
      category: "Support",
      responsibilities: [
        { title: "Success", description: "Help creators achieve their goals on Gumroad." },
        { title: "Support", description: "Provide world-class support to our top creators." },
        { title: "Education", description: "Create resources and guides for creator success." },
        { title: "Relationships", description: "Build lasting relationships with key creators." }
      ],
      stack: []
    },
    {
      slug: "technical-support-intern",
      title: "Technical Support Intern",
      salary: "$180k+",
      type: "Full-time",
      location: "DUMBO | New York",
      category: "Support",
      responsibilities: [
        { title: "Support", description: "Help creators with technical questions and issues." },
        { title: "Documentation", description: "Improve our help center and documentation." },
        { title: "Bugs", description: "Identify and report bugs to the engineering team." },
        { title: "Learning", description: "Learn the Gumroad platform inside and out." }
      ],
      stack: []
    }
  ].freeze

  def careers
    @jobs = JOBS
  end

  def job
    @job = JOBS.find { |j| j[:slug] == params[:slug] }
    raise ActionController::RoutingError, "Not Found" unless @job
    @title = "#{@job[:title]} - Gumroad Careers"
  end

  private
    def set_layout_and_title
      @hide_layouts = true
      @title = @meta_data[action_name]&.fetch(:title) || "Gumroad"
    end

    def set_meta_data
      @meta_data = {
        "about" => {
          url: :about_url,
          title: "Earn your first dollar online with Gumroad",
          description: "Start selling what you know, see what sticks, and get paid. Simple and effective."
        },
        "careers" => {
          url: :careers_url,
          title: "Careers at Gumroad - Build the road with us",
          description: "Join us to build the #1 tool for creators. Explore open roles and help shape the future of digital commerce."
        },
        "features" => {
          url: :features_url,
          title: "Gumroad features: Simple and powerful e-commerce tools",
          description: "Sell books, memberships, courses, and more with Gumroad's simple e-commerce tools. Everything you need to grow your audience."
        },
        "hackathon" => {
          url: :hackathon_url,
          title: "Gumroad $100K Niche Marketplace Hackathon",
          description: "Build a niche marketplace using Gumroad OSS. $100K in prizes for the best marketplace ideas and implementations."
        },
        "pricing" => {
          url: :pricing_url,
          title: "Gumroad pricing: 10% flat fee",
          description: "No monthly fees, just a simple 10% cut per sale. Gumroad's pricing is transparent and creator-friendly."
        },
        "privacy" => {
          url: :privacy_url,
          title: "Gumroad privacy policy: how we protect your data",
          description: "Learn how Gumroad collects, uses, and protects your personal information. Your privacy matters to us."
        },
        "prohibited" => {
          url: :prohibited_url,
          title: "Prohibited products on Gumroad",
          description: "Understand what products and activities are not allowed on Gumroad to comply with our policies."
        },
        "terms" => {
          url: :terms_url,
          title: "Gumroad terms of service",
          description: "Review the rules and guidelines for using Gumroad's services. Stay informed and compliant."
        },
        "small_bets" => {
          url: :small_bets_url,
          title: "Small Bets by Gumroad",
          description: "Explore the Small Bets initiative by Gumroad. Learn, experiment, and grow with small, actionable projects."
        }
      }
    end
end
