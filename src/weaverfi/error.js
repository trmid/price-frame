// Class to handle WeaverFi Errors:
export class WeaverError extends Error {
    constructor(chain, project, description, sourceError) {
        let message = '';
        if (project) {
            message = `Could not fetch ${project} balances on ${chain.toUpperCase()}`;
            if (description.endsWith('()')) {
                description += ' promise rejected';
            }
        }
        else if (description.startsWith('Querying') || description.includes('multicall')) {
            message = `Could not execute query on ${chain.toUpperCase()}`;
        }
        else if (description.includes('project:')) {
            message = `Invalid project queried on ${chain.toUpperCase()}`;
        }
        super(message);
        this.chain = chain;
        this.project = project;
        this.description = description;
        this.sourceError = sourceError;
        this.isWeaverError = true;
    }
}
