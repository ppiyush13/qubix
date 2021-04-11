import slugify from '@sindresorhus/slugify';

export default pkgName => {
    const prefixPkgName = 'MF ' + pkgName + ' base url';
    const slug = slugify(prefixPkgName, {
        separator: '_',
        customReplacements: [
            ['@font-face', ''],
        ],
    });
    return slug.toUpperCase();
};
