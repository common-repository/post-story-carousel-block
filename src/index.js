import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, ColorPalette, Spinner } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import '../src/editor.css';
import '../src/style.css';

// Define default font colors
const FONT_COLORS = [
    { color: '#000000', name: 'Black' },
    { color: '#FFFFFF', name: 'White' },
    { color: '#FF0000', name: 'Red' },
    // Add more colors as needed
];

// Function to fetch media details
const fetchMedia = async (mediaId) => {
    try {
        const response = await fetch(`${wpApiSettings.root}wp/v2/media/${mediaId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wpApiSettings.nonce,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('Fetching media failed:', error);
        return null;
    }
};

// Function to fetch author details
const fetchAuthor = async (authorId) => {
    try {
        const response = await fetch(`${wpApiSettings.root}wp/v2/users/${authorId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': wpApiSettings.nonce,
            },
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('Fetching author details failed:', error);
        return null;
    }
};

function stripHtmlTags(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

// Register block type
wp.blocks.registerBlockType('sspsgb/post-carousel', {
    title: __('Post Story Carousel', 'post-story-carousel-block'),
    icon: 'slides',
    category: 'layout',
    attributes: {
        numberOfPosts: { type: 'number', default: 7 },
        postType: { type: 'string', default: 'posts' },
        category: { type: 'string', default: '' },
        fontSize: { type: 'number', default: 14 },
        fontFamily: { type: 'string', default: 'Arial' },
        fontColor: { type: 'string', default: '#ffffff' },
        lineHeight: { type: 'number', default: 1 },
        subtitleLength: { type: 'number', default: 50 },
        paddingTop: { type: 'number', default: 10 },
        paddingBottom: { type: 'number', default: 10 },
        paddingLeft: { type: 'number', default: 10 },
        paddingRight: { type: 'number', default: 10 },
        marginTop: { type: 'number', default: 10 },
        marginBottom: { type: 'number', default: 10 },
        marginLeft: { type: 'number', default: 10 },
        marginRight: { type: 'number', default: 10 },
        imageSize: { type: 'string', default: 'large' },
        customImageWidth: { type: 'number', default: 175 },
        customImageHeight: { type: 'number', default: 350 },
        descriptionFontSize: { type: 'number', default: 12 },
        descriptionFontColor: { type: 'string', default: '#ffffff' },
        cardSpace: { type: 'number', default: 5 },
    },
    edit: (props) => {
        const { attributes, setAttributes } = props;
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [postTypes, setPostTypes] = useState([]); // Add state for post types

        useEffect(() => {
            const fetchPostTypes = async () => {
                try {
                    const response = await fetch(`${wpApiSettings.root}wp/v2/types`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': wpApiSettings.nonce,
                        },
                    });
                    if (!response.ok) throw new Error('Failed to fetch post types');
                    const data = await response.json();

                    // Filter out the 'media' post type and map the remaining post types
                    const postTypeOptions = Object.keys(data)
                        .filter((type) => !['Media', 'media', 'page', 'Page', 'attachment'].includes(type) && data[type].icon) // Exclude 'media' and 'page', and filter by icon presence
                        .map((type) => ({
                            label: data[type].name,
                            value: type,
                        }));

                    setPostTypes(postTypeOptions); // Set post types to state
                } catch (error) {
                    console.error('Fetching post types failed:', error);
                }
            };

            fetchPostTypes();
        }, []); // Empty dependency array so this runs once on mount



        useEffect(() => {
            const fetchPosts = async () => {
                setLoading(true);
                try {
                    const apiUrl = `${wpApiSettings.root}wp/v2/${attributes.postType}?per_page=${attributes.numberOfPosts}${attributes.category ? `&categories=${attributes.category}` : ''}`;
                    const response = await fetch(apiUrl, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': wpApiSettings.nonce,
                        },
                    });
                    if (!response.ok) throw new Error('Network response was not ok.');
                    const data = await response.json();

                    // Fetch media and author details
                    const enrichedPosts = await Promise.all(data.map(async (post) => {
                        const media = post.featured_media ? await fetchMedia(post.featured_media) : null;
                        const author = post.author ? await fetchAuthor(post.author) : null;
                        return { ...post, featured_media: media, author };
                    }));
                    setPosts(enrichedPosts);
                } catch (error) {
                    console.error('Fetching posts failed:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchPosts();
        }, [attributes.numberOfPosts, attributes.postType, attributes.category]);

        const {
            numberOfPosts,
            postType,
            category,
            fontSize,
            fontFamily,
            fontColor,
            lineHeight,
            subtitleLength,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            imageSize,
            customImageWidth,
            customImageHeight,
            descriptionFontSize,
            descriptionFontColor,
            cardSpace,
        } = attributes;



        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Post Settings', 'post-story-carousel-block')}>
                        <SelectControl
                            label={__('Image Size', 'post-story-carousel-block')}
                            value={imageSize}
                            options={[
                                { label: __('Thumbnail', 'post-story-carousel-block'), value: 'thumbnail' },
                                { label: __('Medium', 'post-story-carousel-block'), value: 'medium' },
                                { label: __('Large', 'post-story-carousel-block'), value: 'large' },
                                { label: __('Full', 'post-story-carousel-block'), value: 'full' },
                                { label: __('Custom', 'post-story-carousel-block'), value: 'custom' },
                            ]}
                            onChange={(value) => setAttributes({ imageSize: value })}
                        />
                        {imageSize === 'custom' && (
                            <>
                                <TextControl
                                    label={__('Custom Image Width (px)', 'post-story-carousel-block')}
                                    type="number"
                                    value={customImageWidth}
                                    onChange={(value) => setAttributes({ customImageWidth: parseInt(value, 10) || 175 })}
                                />
                                <TextControl
                                    label={__('Custom Image Height (px)', 'post-story-carousel-block')}
                                    type="number"
                                    value={customImageHeight}
                                    onChange={(value) => setAttributes({ customImageHeight: parseInt(value, 10) || 350 })}
                                />
                            </>
                        )}
                        <RangeControl
                            label={__('Number of Posts', 'post-story-carousel-block')}
                            value={numberOfPosts}
                            onChange={(value) => setAttributes({ numberOfPosts: value })}
                            min={1}
                            max={20}
                        />
                        <SelectControl
                            label={__('Post Type', 'post-story-carousel-block')}
                            value={postType}
                            options={postTypes} // Use dynamic post types
                            onChange={(value) => setAttributes({ postType: value })}
                        />
                        <TextControl
                            label={__('Category Name (Add Comma sapreated with name or leave empty for all)', 'post-story-carousel-block')}
                            value={category}
                            onChange={(value) => setAttributes({ category: value })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Title Settings', 'post-story-carousel-block')}>
                        <RangeControl
                            label={__('Title Font Size', 'post-story-carousel-block')}
                            value={fontSize}
                            onChange={(value) => setAttributes({ fontSize: value })}
                            min={10}
                            max={50}
                        />
                        <TextControl
                            label={__('Title Font Family', 'post-story-carousel-block')}
                            value={fontFamily}
                            onChange={(value) => setAttributes({ fontFamily: value })}
                        />
                        <ColorPalette
                            label={__('Title Font Color', 'post-story-carousel-block')}
                            colors={FONT_COLORS}
                            value={fontColor}
                            onChange={(color) => setAttributes({ fontColor: color })}
                        />
                        <RangeControl
                            label={__('Title Line Height', 'post-story-carousel-block')}
                            value={lineHeight}
                            onChange={(value) => setAttributes({ lineHeight: value })}
                            min={0}
                            max={2}
                        />
                    </PanelBody>
                    <PanelBody title={__('Subtitle Settings', 'post-story-carousel-block')}>
                        <RangeControl
                            label={__('Subtitle Font Size', 'post-story-carousel-block')}
                            value={descriptionFontSize}
                            onChange={(value) => setAttributes({ descriptionFontSize: value })}
                            min={10}
                            max={50}
                        />
                        <ColorPalette
                            label={__('Subtitle Font Color', 'post-story-carousel-block')}
                            colors={FONT_COLORS}
                            value={descriptionFontColor}
                            onChange={(color) => setAttributes({ descriptionFontColor: color })}
                        />
                        <RangeControl
                            label={__('Subtitle Length', 'post-story-carousel-block')}
                            value={subtitleLength}
                            onChange={(value) => setAttributes({ subtitleLength: value })}
                            min={10}
                            max={200}
                        />
                    </PanelBody>
                    <PanelBody title={__('Spacing Settings', 'post-story-carousel-block')}>
                        <RangeControl
                            label={__('Padding Top', 'post-story-carousel-block')}
                            value={paddingTop}
                            onChange={(value) => setAttributes({ paddingTop: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Padding Bottom', 'post-story-carousel-block')}
                            value={paddingBottom}
                            onChange={(value) => setAttributes({ paddingBottom: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Padding Left', 'post-story-carousel-block')}
                            value={paddingLeft}
                            onChange={(value) => setAttributes({ paddingLeft: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Padding Right', 'post-story-carousel-block')}
                            value={paddingRight}
                            onChange={(value) => setAttributes({ paddingRight: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Margin Top', 'post-story-carousel-block')}
                            value={marginTop}
                            onChange={(value) => setAttributes({ marginTop: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Margin Bottom', 'post-story-carousel-block')}
                            value={marginBottom}
                            onChange={(value) => setAttributes({ marginBottom: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Margin Left', 'post-story-carousel-block')}
                            value={marginLeft}
                            onChange={(value) => setAttributes({ marginLeft: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Margin Right', 'post-story-carousel-block')}
                            value={marginRight}
                            onChange={(value) => setAttributes({ marginRight: value })}
                            min={0}
                            max={50}
                        />
                        <RangeControl
                            label={__('Card Space', 'post-story-carousel-block')}
                            value={cardSpace}
                            onChange={(value) => setAttributes({ cardSpace: value })}
                            min={0}
                            max={50}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...useBlockProps()}>
                    {loading ? (
                        <div className="post-carousel-loading">
                            <Spinner />
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="ssspsgb-carousel">
                            <div className="sspsgb-story-container">
                                {posts.map((post, index) => {
                                    const backgroundImageUrl = post.featured_media?.source_url || sspsgbpPath + 'assets/img/default-story.jpg';
                                    return (
                                        <div
                                            key={index}
                                            className="sspsgb-story-card"
                                            style={{
                                                backgroundImage: `url(${backgroundImageUrl})`,
                                                width: `${customImageWidth}px`,
                                                height: `${customImageHeight}px`,
                                                margin: `${cardSpace}px`,
                                            }}
                                        >
                                            <a href={post.link} className="sspsgb-story-info">
                                                {post.author && post.author.avatar_urls && (
                                                    <img
                                                        className="sspsgb-user-logo"
                                                        src={post.author.avatar_urls[24]}
                                                        alt={post.author.name}
                                                        width="30"
                                                        height="30"
                                                    />
                                                )}
                                                <div
                                                    className="sspsgb-story-title"
                                                    style={{
                                                        fontSize: `${fontSize}px`,
                                                        fontFamily,
                                                        color: fontColor,
                                                        lineHeight: `${lineHeight}`,
                                                    }}
                                                >
                                                    {post.title.rendered}
                                                </div>
                                            </a>
                                            <div
                                                className="sspsgb-story-description"
                                                style={{
                                                    fontSize: `${descriptionFontSize}px`,
                                                    color: descriptionFontColor,
                                                }}
                                            >
                                                {stripHtmlTags(post.content.rendered).length > subtitleLength
                                                    ? stripHtmlTags(post.content.rendered).substring(0, subtitleLength) + '...'
                                                    : stripHtmlTags(post.content.rendered)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="sspsgb-arrow sspsgb-left">&#8249;</div>
                            <div className="sspsgb-arrow sspsgb-right">&#8250;</div>
                        </div>
                    ) : (
                        <p>{__('No posts available.', 'post-story-carousel-block')}</p>
                    )}
                </div>
            </>
        );
    },
    save: () => null,
});