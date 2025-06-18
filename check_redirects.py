#!/usr/bin/env python3
import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import sys

# Base URL of the site to crawl
base_url = "http://localhost:4321"
visited_urls = set()
redirect_count = 0
total_links = 0

def is_internal_url(url):
    """Check if the URL is internal to the site."""
    parsed_url = urlparse(url)
    parsed_base = urlparse(base_url)
    return parsed_url.netloc == parsed_base.netloc or not parsed_url.netloc

def check_url(url):
    """Check a URL for redirects and extract links."""
    global redirect_count, total_links
    
    if url in visited_urls:
        return
    
    visited_urls.add(url)
    print(f"Checking: {url}")
    
    try:
        response = requests.get(url, allow_redirects=False)
        total_links += 1
        
        if 300 <= response.status_code < 400:
            redirect_count += 1
            redirect_url = response.headers.get('Location')
            print(f"  REDIRECT: {url} -> {redirect_url} ({response.status_code})")
        else:
            print(f"  OK: {response.status_code}")
            
            # Only parse HTML content for links
            if 'text/html' in response.headers.get('Content-Type', ''):
                soup = BeautifulSoup(response.text, 'html.parser')
                links = soup.find_all('a', href=True)
                
                for link in links:
                    href = link['href']
                    if href.startswith('/') or href.startswith(base_url):
                        full_url = urljoin(base_url, href)
                        if is_internal_url(full_url) and full_url not in visited_urls:
                            check_url(full_url)
    
    except Exception as e:
        print(f"  ERROR: {e}")

def main():
    """Main function to start the crawl."""
    print(f"Starting crawl of {base_url}")
    check_url(base_url)
    
    print("\nCrawl Summary:")
    print(f"Total links checked: {total_links}")
    print(f"Redirects found: {redirect_count}")
    print(f"Unique pages visited: {len(visited_urls)}")
    
    if redirect_count > 0:
        print("\nWARNING: Redirects found! Check the output above for details.")
        return 1
    else:
        print("\nSUCCESS: No redirects found!")
        return 0

if __name__ == "__main__":
    sys.exit(main())
