
// commands
export const commands = {
    'DELETE_BLOG': 'DELETE_BLOG',
    'EDIT_BLOG': 'EDIT_BLOG',
    'TOGGLE_FEATURE': 'TOGGLE_FEATURE'
};


const createOption = (name, command) => ({name, command})

// options
// published blogs
const DELETE_BLOG = createOption('Delete Blog', commands.DELETE_BLOG);
const EDIT_BLOG = createOption('Edit Blog', commands.EDIT_BLOG);
const FEATURE_BLOG = createOption('Feature Blog', commands.TOGGLE_FEATURE);
const Un_FEATURE_BLOG = createOption('Un-Feature Blog', commands.TOGGLE_FEATURE);

// drafts
const DELETE_DRAFT = createOption('Delete Draft', commands.DELETE_BLOG);
const EDIT_DRAFT = createOption('Edit Draft', commands.EDIT_BLOG);


export const createPublishedOptions = (isFeatured) => {
    var options = [EDIT_BLOG, DELETE_BLOG];

    isFeatured ? options.push(Un_FEATURE_BLOG) : options.push(FEATURE_BLOG);
    return options;
};
export const createDraftsOptions = () => [EDIT_DRAFT, DELETE_DRAFT];



