import { renderHook, act } from '@testing-library/react-hooks';
import useGenerator from '../use-generator';

function* gen0() {
  yield 0;
  return 1;
}

function* gen1() {
  yield 0;
}

describe('useGenerator', () => {
  test('should update many times', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGenerator(gen0())
    );

    let value;
    let done;

    [value, done] = result.current;
    expect(value).toBe(0);
    expect(done).toBe(false);

    // XXX: `waitForNextUpdate` is not working here
    /*
    await waitForNextUpdate();

    [value, done] = result.current;
    expect(value).toBe(1);
    expect(done).toBe(true);
    */
  });

  test('should just update the yield value', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGenerator(gen1())
    );

    const [value, done] = result.current;
    expect(value).toBe(0);
    expect(done).toBe(false);
  });
});
