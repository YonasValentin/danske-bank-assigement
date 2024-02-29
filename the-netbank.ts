/**
 * Represents basic user information.
 */
interface UserInformation {
  email: string;
  name: string;
}

/**
 * Defines error details for handling user and system errors.
 * Includes an error type to distinguish between client and server errors.
 */
interface ErrorDetails {
  code: string; // Unique error code.
  message: string; // Human-readable error message.
  errorType: 'client' | 'server'; // Error type.
  timestamp?: Date; // Optional timestamp for when the error occurred.
}

/**
 * Represents the state of a user within the application.
 */
type UserState =
  | { status: 'loggedOut' }
  | { status: 'loading' } // Indicates asynchronous user data fetching.
  | { status: 'error'; error: ErrorDetails } // Captures detailed error information.
  | { status: 'loggedIn'; user: UserInformation }; // User successfully logged in.

/**
 * Supported currencies within the netbank app.
 */
enum Currency {
  DKK = 'DKK',
  SEK = 'SEK',
  NOK = 'NOK',
  USD = 'USD',
  EUR = 'EUR',
}

/**
 * Base interface for all account types, containing common properties.
 */
interface BaseAccount {
  name: string;
  iban: string;
}

/**
 * Represents a regular account with a fixed currency (DKK).
 */
interface RegularAccount extends BaseAccount {
  type: 'regular';
  currency: Currency.DKK;
  amount: number;
}

/**
 * Represents a pocket within a pocket account, allowing for multiple currencies.
 * Specifically excludes DKK to ensure pocket accounts can hold diverse currency options,
 * while regular accounts are limited to DKK.
 */
interface Pocket {
  amount: number;
  currency: Exclude<Currency, Currency.DKK>; // Excludes DKK from the pocket currency options.
}

/**
 * Represents a pocket account that can contain multiple pockets in different currencies.
 */
interface PocketAccount extends BaseAccount {
  type: 'pocket';
  pockets: Pocket[]; // Array of pockets, each in a different currency.
}

/**
 * Union type for account, covering both regular and pocket accounts.
 */
type Account = RegularAccount | PocketAccount;

/**
 * Enum representing each distinct page in the application, ensuring only one can be active.
 */
enum ActivePage {
  Accounts = 'accounts',
  Support = 'support',
}

/**
 * Represents the application's current page state, including if it's loading or has encountered an error.
 */
type PageState = {
  activePage: ActivePage;
  isLoading: boolean;
  isError: boolean;
};

/**
 * Enum for chat window states, supporting minimized, open, and full-screen states.
 */
enum ChatWindowState {
  Minimized = 'minimized',
  Open = 'open',
  FullScreen = 'full-screen',
}

/**
 * Defines the structure of chat messages within the application.
 */
interface ChatMessage {
  name: string; // Sender's name.
  message: string; // Message content.
  timeSent: Date; // Timestamp for when the message was sent.
}

/**
 * Represents the status of the chat feature within the application.
 */
type ChatStatus =
  | { status: 'idle' } // No active chat.
  | { status: 'connecting' } // Attempting to connect to an agent.
  | {
      status: 'inQueue';
      position: number;
      busyInfo?: {
        mostBusyTimes: string[]; // Describes periods with the highest chat volume.
        leastBusyTimes: string[]; // Describes periods with the lowest chat volume.
      };
    } // Waiting in queue, with optional busy times info.
  | { status: 'connected'; messages: ChatMessage[]; currentMessage: string } // Chat is active.
  | { status: 'disconnected' }; // Chat has been closed.

/**
 * Represents the overall state of the NetBank application, integrating user authentication status,
 * current page state, account details, and chat functionality.
 */
interface NetBankState {
  userState: UserState;
  pageState: PageState;
  accounts: Account[];
  chat: {
    windowState: ChatWindowState; // Reflects the visual state of the chat window across the application.
    status: ChatStatus; // Captures the interaction and connection status of the chat feature.
  };
}
