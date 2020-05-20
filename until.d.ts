/**
 * Hangs the execution context until the test is passed.
 */
export default function until(test: () => boolean | Promise<boolean>): Promise<void>;
