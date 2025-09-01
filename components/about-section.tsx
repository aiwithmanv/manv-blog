export default function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto w-full px-6 lg:px-0 my-16 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <div className="prose prose-lg dark:prose-invert mx-auto text-center">
          <p className="text-xl leading-relaxed mb-6">
            Hey there—I'm <strong>Manv</strong>, and this corner of the internet exists for one reason: to make AI feel useful—never intimidating—in the hands of the people who shape kids' lives every day.
          </p>
          
          <p className="text-lg leading-relaxed mb-6">
            After years of wrangling complex tech, I realized the real frontier isn't faster chips; it's classrooms and living rooms hungry for clear, honest guidance. So here's what we're building:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 my-12 text-left">
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-primary">Straighttalk Explainers</h3>
              <p className="text-muted-foreground">
                No buzzwords—just the "why it matters" and "how to try it tomorrow."
              </p>
            </div>
            
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-primary">Fieldtested Stories</h3>
              <p className="text-muted-foreground">
                Wins, stumbles, and aha moments from teachers, parents, and students already experimenting with AI.
              </p>
            </div>
            
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-primary">Practical Playbooks</h3>
              <p className="text-muted-foreground">
                Simple workflows, safety checklists, and resource lists you can swipe and use.
              </p>
            </div>
          </div>
          
          <p className="text-lg leading-relaxed">
            If you want AI that lifts learning rather than adds noise, you're in the right place. Pull up a chair, ask questions, and let's figure it out together—one realworld story at a time.
          </p>
        </div>
      </div>
    </section>
  );
}