import { buildSchema } from 'graphql';

// Definir el esquema GraphQL
const schema = buildSchema(`
input LocationInput {
  x: Int!
  y: Int!
}

input InitialPositionInput {
  location: LocationInput!
  facing: String!
}

type Query {
  runSimulation(
    terrain: [[String]!]!
    battery: Int!
    commands: [String]!
    initialPosition: InitialPositionInput!
  ): SimulationResult
}

type SimulationResult {
  VisitedCells: [Location]!
  SamplesCollected: [String]!
  Battery: Int!
  FinalPosition: FinalPosition!
}

type Location {
  X: Int!
  Y: Int!
}

type FinalPosition {
  Location: Location!
  Facing: String!
}
`);

export default schema;