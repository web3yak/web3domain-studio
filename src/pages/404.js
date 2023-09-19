// pages/404.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

function Custom404() {
  const router = useRouter();
  const { asPath } = router;


  useEffect(() => {
    // Get the current pathname
    const { asPath } = router;

    // Check if the URL starts with "/@"
    if (asPath.startsWith('/@')) {
      // Extract the username from the URL
      const username = asPath.slice(2);

      // Redirect to the desired page
      router.replace(`/domain/visit/${username}`);
    }
  }, [router]);


  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page <code>{asPath}</code> does not exist.</p>
      <Link href="/">
        <a>Go back to the home page</a>
      </Link>
    </div>
  );
}

export default Custom404;
