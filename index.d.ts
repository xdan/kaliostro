/// <reference types="@v4fire/client"/>

interface IncludeReturns extends Record<string, any> {}

declare function include<PATH extends keyof IncludeReturns>(path: PATH, ...args: any[]): IncludeReturns[PATH];

interface HTMLElement {
	component?: any;
}
