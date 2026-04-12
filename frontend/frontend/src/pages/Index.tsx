import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Target, Clock, Users, Trophy, Award, Medal, Download, Lightbulb, Handshake, Globe, ArrowRight, Timer, UserCheck, Sparkles, Zap, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-hackathon.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <img
          src={heroImage}
          alt="Code Wars Hackathon"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/95" />

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-accent/20 rounded-full animate-float" />
          <div className="absolute top-1/3 right-[15%] w-20 h-20 border border-accent/10 rotate-45 animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-[20%] w-16 h-16 border border-light-blue/15 rounded-lg rotate-12 animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-[60%] right-[10%] w-24 h-24 border border-accent/15 rounded-full animate-float" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/15 backdrop-blur-sm border border-accent/25 rounded-full px-5 py-2 text-sm font-medium mb-8 text-accent">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Registration Open
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-3 leading-[0.95] tracking-tight">
              Code Wars
            </h1>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-accent/50" />
              <span className="font-heading text-xl md:text-2xl text-accent font-medium tracking-widest uppercase">Hackathon 2026</span>
              <div className="h-px w-16 bg-accent/50" />
            </div>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-lg mx-auto mb-6 font-light tracking-wide">
              Innovate · Build · Compete
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-primary-foreground/80 text-sm mb-10">
              <div className="flex items-center gap-2.5 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-full px-4 py-2">
                <CalendarDays className="h-4 w-4 text-accent" />
                <span>May 17, 2026</span>
              </div>
              <div className="flex items-center gap-2.5 bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-full px-4 py-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>ENSA Tetouan</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button variant="hero" size="lg" className="text-base px-8 group">
                  Register Now
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="hero-outline" size="lg" className="text-base px-8 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                <Download className="h-4 w-4 mr-2" />
                Download Hackathon Guide
              </Button>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Bar */}
      <section className="bg-secondary py-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 60px, hsl(var(--secondary-foreground) / 0.1) 60px, hsl(var(--secondary-foreground) / 0.1) 61px)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-secondary-foreground">
            {[
              { value: "24h", label: "Of Innovation" },
              { value: "50+", label: "Teams Expected" },
              { value: "17.5K", label: "MAD in Prizes" },
              { value: "4", label: "Max per Team" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-heading font-bold">{stat.value}</div>
                <div className="text-xs opacity-80 mt-1 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 gradient-soft relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-3 block">About</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">The Hackathon That Makes a Difference</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A technology event where students collaborate, innovate, and present impactful solutions.
              Join us for an intense day of creativity and friendly competition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: CalendarDays, title: "Date", desc: "May 17, 2026", gradient: "from-accent/30 to-accent/5" },
              { icon: MapPin, title: "Location", desc: "ENSA Tetouan", gradient: "from-secondary/20 to-secondary/5" },
              { icon: Target, title: "Objective", desc: "Innovate & solve real-world challenges", gradient: "from-cream to-cream/30" },
            ].map((item, i) => (
              <div key={i} className={`glass-card rounded-2xl p-8 text-center group hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <item.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Participate */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-3 block text-center">Benefits</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">Why Participate?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Lightbulb, title: "Learn", desc: "Develop your technical skills and explore new technologies", delay: "0s" },
              { icon: Handshake, title: "Collaborate", desc: "Work as a team on innovative and creative projects", delay: "0.1s" },
              { icon: Trophy, title: "Win", desc: "Compete for prizes totaling up to 17,500 MAD", delay: "0.2s" },
              { icon: Globe, title: "Network", desc: "Connect with fellow tech enthusiasts and mentors", delay: "0.3s" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-card relative p-8 rounded-2xl hover:border-accent/40 hover:shadow-[0_0_30px_rgba(var(--accent),0.15)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden animate-fade-in"
                style={{ animationDelay: item.delay }}
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-colors" />

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <item.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 tracking-tight group-hover:text-secondary transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-24 gradient-soft relative">
        <div className="container mx-auto px-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-3 block text-center">Schedule</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-14">Event Schedule</h2>

          <div className="max-w-2xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-secondary via-accent to-secondary/30 hidden sm:block" />

            <div className="space-y-8">
              {[
                { time: "11:00 AM", title: "Opening Conference", desc: "Duration: 1 hour 30 minutes — Challenge presentation and rules.", icon: Clock, color: "bg-secondary" },
                { time: "Afternoon", title: "Project Presentations", desc: "Each team has 15 minutes to present and defend their idea before a jury.", icon: Users, color: "bg-accent" },
              ].map((event, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 sm:pl-20 relative group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`hidden sm:flex absolute left-3 top-6 w-7 h-7 ${event.color} rounded-full items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <event.icon className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <div className="text-xs font-bold text-secondary tracking-wider uppercase mb-2">{event.time}</div>
                  <h3 className="font-heading font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-10 relative overflow-hidden border-secondary/10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />

            <div className="text-center mb-8 relative z-10">

              <h2 className="font-heading text-2xl font-bold">Registration Info</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8 relative z-10">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors group">
                <div className="w-11 h-11 bg-secondary/15 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Timer className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Deadline</div>
                  <div className="text-sm text-muted-foreground">3 weeks before the event</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors group">
                <div className="w-11 h-11 bg-accent/20 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <UserCheck className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Per Team</div>
                  <div className="text-sm text-muted-foreground">Maximum 4 members</div>
                </div>
              </div>
            </div>
            <div className="text-center relative z-10">
              <Link to="/register">
                <Button size="lg" className="group">
                  Register Now
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-24 relative overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-navy/90 backdrop-blur-sm" />

        <div className="container mx-auto px-4 relative z-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 block text-center">Rewards</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-4">Prizes to Win</h2>
          <p className="text-center text-primary-foreground/60 max-w-md mx-auto mb-14 text-sm">
            Top-performing teams will be rewarded for their innovation and hard work.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto items-end">
            {/* 2nd Prize */}
            <div className="order-2 md:order-1 bg-primary-foreground/8 backdrop-blur-md border border-primary-foreground/15 rounded-2xl p-10 text-center text-primary-foreground group hover:border-primary-foreground/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="h-7 w-7 text-silver" />
              </div>
              <div className="text-sm font-medium opacity-70 mb-2 tracking-wider uppercase">2nd Prize</div>
              <div className="text-3xl font-heading font-bold">5,000</div>
              <div className="text-sm opacity-60 mt-1">MAD</div>
            </div>

            {/* 1st Prize - Featured */}
            <div className="order-1 md:order-2 md:-translate-y-6 bg-primary-foreground/10 backdrop-blur-md border border-accent/30 rounded-2xl p-12 text-center text-primary-foreground relative overflow-hidden group hover:border-accent/50 hover:-translate-y-8 transition-all duration-300">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-b-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-18 h-18 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 w-[72px] h-[72px]">
                  <Trophy className="h-9 w-9 text-gold" />
                </div>
                <div className="text-sm font-medium opacity-70 mb-2 tracking-wider uppercase">1st Prize</div>
                <div className="text-4xl font-heading font-bold">10,000</div>
                <div className="text-sm opacity-60 mt-1">MAD</div>
              </div>
            </div>

            {/* 3rd Prize */}
            <div className="order-3 bg-primary-foreground/8 backdrop-blur-md border border-primary-foreground/15 rounded-2xl p-10 text-center text-primary-foreground group hover:border-primary-foreground/30 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-primary-foreground/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Medal className="h-7 w-7 text-bronze" />
              </div>
              <div className="text-sm font-medium opacity-70 mb-2 tracking-wider uppercase">3rd Prize</div>
              <div className="text-3xl font-heading font-bold">2,500</div>
              <div className="text-sm opacity-60 mt-1">MAD</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Code className="h-10 w-10 text-secondary mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Compete?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Gather your team, sharpen your skills, and get ready for an unforgettable hackathon experience.
          </p>
          <Link to="/register">
            <Button size="lg" className="group text-base px-10">
              Register Your Team
              <Zap className="h-4 w-4 ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
