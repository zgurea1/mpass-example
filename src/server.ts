import App from './app';

import MpassRoute from '@routes/mpass.routes';

const app = new App([new MpassRoute()]);

app.listen();
