import type { SiteContent } from '../types/content';

function isValidUrl(url: string): boolean {
  if (url.startsWith('mailto:')) {
    return /mailto:[^\s@]+@[^\s@]+\.[^\s@]+/.test(url);
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function validateSiteContent(content: SiteContent): string[] {
  const errors: string[] = [];

  if (!content.profile.name.trim()) errors.push('Profile name is required.');
  if (!content.profile.role.trim()) errors.push('Profile role is required.');
  if (!content.profile.summary.trim()) errors.push('Profile summary is required.');
  if (!content.profile.portrait.trim()) errors.push('Profile portrait asset path is required.');

  if (!content.resume.filePath.trim()) {
    errors.push('Resume file path is required.');
  }

  if (!content.projects.length) {
    errors.push('At least one project is required.');
  }

  content.projects.forEach((project, index) => {
    if (!project.title.trim()) errors.push(`Project #${index + 1} is missing a title.`);
    if (!project.description.trim()) errors.push(`Project #${index + 1} is missing a description.`);
    if (!project.image.trim()) errors.push(`Project #${index + 1} is missing an image path.`);
    if (!project.links.length) errors.push(`Project #${index + 1} requires at least one link.`);

    project.links.forEach((link, linkIndex) => {
      if (!link.label.trim()) {
        errors.push(`Project #${index + 1} link #${linkIndex + 1} is missing a label.`);
      }
      if (!isValidUrl(link.url)) {
        errors.push(`Project #${index + 1} link #${linkIndex + 1} has an invalid URL.`);
      }
    });
  });

  content.experience.forEach((item, index) => {
    if (!item.role.trim()) errors.push(`Experience #${index + 1} is missing a role.`);
    if (!item.company.trim()) errors.push(`Experience #${index + 1} is missing a company.`);
    if (!item.period.trim()) errors.push(`Experience #${index + 1} is missing a period.`);
  });

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.contact.email)) {
    errors.push('Contact email must be a valid address.');
  }

  content.contact.social.forEach((link, index) => {
    if (!isValidUrl(link.url)) {
      errors.push(`Social link #${index + 1} is not a valid URL.`);
    }
  });

  return errors;
}

export function assertValidSiteContent(content: SiteContent): void {
  const errors = validateSiteContent(content);

  if (errors.length > 0) {
    throw new Error(`Invalid site content:\n- ${errors.join('\n- ')}`);
  }
}
