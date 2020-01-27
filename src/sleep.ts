/**
 * Delays the execution context for a while before running the remaining
 * procedures.
 */
export default function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, Number(ms)));
}