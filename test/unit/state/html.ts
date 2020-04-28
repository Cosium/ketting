import { expect } from 'chai';

import Link from '../../../src/link';
import Html from '../../../src/representor/html';

describe('HTML representor', () => {

  type TestTuple = [string] | [string, Link] | [string, Link, Link];

  const tests: TestTuple[] = [
    [
      '<link rel="me" href="https://evertpot.com/" />',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<link rel="me" href="https://evertpot.com/">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<LINK rel="me" href="https://evertpot.com/">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<link REL="me" href="https://evertpot.com/">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<link href="https://evertpot.com/" rel="me" />',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<link href="https://evertpot.com/" rel="me" title="my website!"/>',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<link href="foo.css" rel="stylesheet" type="text/css" />',
      new Link({rel: 'stylesheet', context: '/index.html', href: 'foo.css', type: 'text/css'})
    ],
    [
      '<a href="https://evertpot.com/" rel="me">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<A href="https://evertpot.com/" rel="me">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<a HREF="https://evertpot.com/" rel="me">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<a rel="me" href="https://evertpot.com/">',
      new Link({rel: 'me', context: '/index.html', href: 'https://evertpot.com/'})
    ],
    [
      '<a rel="icon favicon" href="favicon.ico">',
      new Link({rel: 'icon', context: '/index.html', href: 'favicon.ico'}),
      new Link({rel: 'favicon', context: '/index.html', href: 'favicon.ico'}),
    ],
    [
      // Ignoring links without rel
      '<link href="https://evertpot.com/" />',
    ],
    [
      // Ignoring links without href
      '<link rel="me" />',
    ]
  ];

  tests.forEach( value => {

    it('should parse ' + value[0], () => {

      const html = new Html('/index.html', 'text/html', value[0], new Map());

      const links = value.slice(1);

      expect(html.uri).to.equal('/index.html');
      expect(html.contentType).to.equal('text/html');
      expect(html.getLinks()).to.eql(links);

    });

  });

});
