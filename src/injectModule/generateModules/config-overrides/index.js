import createModule from './createModule';

export default ({ inputPath, outputPath, requireFrom }) => {

    return createModule({
        inputPath,
        requireFrom,
        buildPath: outputPath,
    });
};
