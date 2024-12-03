'use client';

type Props = {
  // error: Error & {digest?: string}
  reset: () => void;
}
export default function GlobalError({reset}: Props) {
  return (
    <html>
      <body>
        <h2>Unwanted error occurred 😩</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
