import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <p className="text-sm font-semibold tracking-wider text-accent-600 uppercase">
        404
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-slate-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-8">
        <Button href="/">Back to Home</Button>
      </div>
    </Container>
  );
}
