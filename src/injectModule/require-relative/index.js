import relative from 'relative';
import {normalizeSafe} from 'upath';

export default function requireRelative(from, to) {
    const relativePath = relative(from, to);
    return normalizeSafe('./' + relativePath);
};