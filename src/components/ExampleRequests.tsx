import React from 'react';
import './ExampleRequests.css';
import { HttpMethod } from '../types';

export interface ExampleRequest {
  name: string;
  url: string;
  method?: HttpMethod;
  description?: string;
}

const EXAMPLE_REQUESTS: ExampleRequest[] = [
  {
    name: 'Open Library - Tolkien Books',
    url: 'https://openlibrary.org/search.json?author=tolkien&sort=new',
    method: 'GET',
    description: 'Search for books by J.R.R. Tolkien',
  },
  {
    name: 'Meow Facts',
    url: 'https://meowfacts.herokuapp.com/',
    method: 'GET',
    description: 'Get random cat facts',
  },
  {
    name: 'Pokemon API - Item',
    url: 'https://pokeapi.co/api/v2/item/126',
    method: 'GET',
    description: 'Get Pokemon item details',
  },
  {
    name: 'Pokemon API - Berry Flavor',
    url: 'https://pokeapi.co/api/v2/berry-flavor/1/',
    method: 'GET',
    description: 'Get berry flavor information',
  },
  {
    name: 'Pokemon API - Pokedex',
    url: 'https://pokeapi.co/api/v2/pokedex/12/',
    method: 'GET',
    description: 'Get Kalos Central Pokedex',
  },
  {
    name: 'Random User',
    url: 'https://randomuser.me/api/',
    method: 'GET',
    description: 'Get random user data',
  },
  {
    name: 'Is Even API',
    url: 'https://api.isevenapi.xyz/api/iseven/6/',
    method: 'GET',
    description: 'Check if a number is even',
  },
  {
    name: 'Star Wars API - People',
    url: 'https://swapi.dev/api/people/1',
    method: 'GET',
    description: 'Get Star Wars character data',
  },
  {
    name: 'Star Wars API - Planets',
    url: 'https://swapi.dev/api/planets/3/',
    method: 'GET',
    description: 'Get Star Wars planet information',
  },
  {
    name: 'Star Wars API - Starships',
    url: 'https://swapi.dev/api/starships/9/',
    method: 'GET',
    description: 'Get Star Wars starship details',
  },
];

interface ExampleRequestsProps {
  onSelect: (example: ExampleRequest) => void;
}

const ExampleRequests: React.FC<ExampleRequestsProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (example: ExampleRequest): void => {
    onSelect(example);
    setIsOpen(false);
  };

  return (
    <div className="example-requests-container">
      <div className="example-requests-header">
        <h2 className="example-requests-title">Select to load a pre-defined example request</h2>
        <p className="example-requests-subtitle">
          From a small list of public APIs, you can find more here{' '}
          <a
            href="https://github.com/public-apis/public-apis"
            target="_blank"
            rel="noopener noreferrer"
            className="example-requests-link"
          >
            https://github.com/public-apis/public-apis
          </a>
        </p>
      </div>
      <button
        type="button"
        className="example-requests-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '▼' : '▶'} Example Requests
      </button>
      {isOpen && (
        <div className="example-requests-list">
          {EXAMPLE_REQUESTS.map((example, index) => (
            <button
              key={index}
              type="button"
              className="example-request-item"
              onClick={() => handleSelect(example)}
            >
              <div className="example-request-name">{example.name}</div>
              <div className="example-request-url">{example.url}</div>
              {example.description && (
                <div className="example-request-description">{example.description}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExampleRequests;
