import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "../../pages/LandingPage";

describe("LandingPage", () => {
	it("renders the LandingPage", () => {
		render(
			<MemoryRouter>
				<LandingPage />
			</MemoryRouter>
		);
		expect(screen.getByText("Welcome to Aloha Pizza!")).toBeInTheDocument();
	});
});

// ❯ src/tests/pages/LandingPage.test.jsx (1 test | 1 failed) 27ms
//    × LandingPage > renders the LandingPage 26ms
//      → Cannot destructure property 'basename' of 'React10.useContext(...)' as it is null.

// ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

//  FAIL  src/tests/pages/LandingPage.test.jsx > LandingPage > renders the LandingPage
// TypeError: Cannot destructure property 'basename' of 'React10.useContext(...)' as it is null.
//  ❯ LinkWithRef node_modules/react-router/dist/development/chunk-IR6S3I6Y.mjs:7163:11
//  ❯ Object.react-stack-bottom-frame node_modules/react-dom/cjs/react-dom-client.development.js:22428:20
//  ❯ renderWithHooks node_modules/react-dom/cjs/react-dom-client.development.js:5757:22
//  ❯ updateForwardRef node_modules/react-dom/cjs/react-dom-client.development.js:7762:19
//  ❯ beginWork node_modules/react-dom/cjs/react-dom-client.development.js:10014:18
//  ❯ runWithFiberInDEV node_modules/react-dom/cjs/react-dom-client.development.js:543:16
//  ❯ performUnitOfWork node_modules/react-dom/cjs/react-dom-client.development.js:15052:22
//  ❯ workLoopSync node_modules/react-dom/cjs/react-dom-client.development.js:14870:41
//  ❯ renderRootSync node_modules/react-dom/cjs/react-dom-client.development.js:14850:11
//  ❯ performWorkOnRoot node_modules/react-dom/cjs/react-dom-client.development.js:14384:44
