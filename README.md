## Description

This is a custom hook for getting data from the API. There is error handling, request status, and re-fetching as needed.

## Example of Usage

```
function MyApp() {
  const [data, error, status, refetch] = useAPI('some-url');

  if (status === 'idle') {
    return <div>Loading...</div>;
  }

  if (status === 'success') {
    return <div>{JSON.stringify(data)}</div>;
  }

  if (status === 'error') {
    return (
      <div>
        <p>Oops! Something went wrong.</p>
        <p>{error.message}</p>
        <button type="button" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }
}
```

**Note:** You can see working example here: [Link to the example](http://darkness8129.github.io/useAPI-hook)
