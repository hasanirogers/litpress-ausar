import { css } from 'lit-element';

export const stylesShared = css`
  a {
    color: var(--color-link);
    text-decoration: none;
    text-shadow: 1px 1px 1px var(--color-black);
  }

  h1 {
    font-size: 2rem;
    line-height: 1;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  pre {
    padding: 1rem;
    line-height: 1.5;
    overflow-x: auto;
    background-color: var(--color-black);
  }

  article {
    font-size: 1.25rem;
    line-height: 2;
    margin: 0 3rem;
    padding-top: 2rem;
    text-shadow: 1px 1px 1px var(--color-black);
  }

  @media screen and (min-width: 640px) {
    h1 {
      font-size: 3rem;
    }

    article {
      margin: 0 4rem;
    }
  }

  .posts-list {
    list-style: none;
  }

  .posts-list li {
    margin: 1rem 0 2rem 0;
  }

  .posts-list h3 {
    font-size: 2rem;
    margin: 0;
    line-height: 1.1;
  }

  .posts-list time {
    font-size: 1rem;
  }

  .posts-list article {
    margin: 0;
    padding: 0;
  }
`;
