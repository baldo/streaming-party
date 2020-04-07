# streaming-party

Streaming Party allows you watching or listening to a stream while video chatting with your friends.
create a Jitsi room (video conference), embed the stream and share the party link with your friends
and you are ready to go.

## Deployment

Streaming Party is a static single page. To deploy it take the following steps:

Clone the repository:

```
git clone https://github.com/baldo/streaming-party.git
cd streaming-party
```

Install the required dependencies (also do so after pulling in new changes):

```
yarn install
```

If you are planning to run Streaming Party under a non root path create a `.env.local` file:

```
BASE_URL=/path/to/streaming-party/
```

Compile the app (after changes to `.env.local` or updating the sources you can use the same command to recompile it):

```
yarn build
```

The directory `./dist/` now contains the static files for the app. Copy those to your webservers
document root (or a subdirectory matching your `BASE_URL` settings).

Configure your webserver as described in the `vue-router`
[documentation](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations).

_Attention: Make sure to also configure HTTPs as microphone or webcam access will most likely be broken otherwise._

## Development

Clone the repository:

```
git clone https://github.com/baldo/streaming-party.git
cd streaming-party
```

Install the required dependencies (also do so after pulling in new changes):

```
yarn install
```

You can run a development server with hot-swapping via (access the app via the URLs provided in the
commands output):

```
yarn serve
```

When contributing please make sure the following commands run through without any error or warning:

```
yarn lint
yarn build
```

## Implementation details

Streaming Party has been bootstrapped via `vue-cli`. For details on customizing this setup have a look
at their [configuration reference](https://cli.vuejs.org/config/).

Other useful resources are:

- [`vue-router` documentation](https://router.vuejs.org/)
- [`vue-class-component` documentation](https://class-component.vuejs.org/) - Streaming Party uses this
  for writing class-style components.
- [`vue-property-decorator` readme](https://github.com/kaorun343/vue-property-decorator/blob/master/README.md) - This
  provides decorators to complement `vue-class-component`.
