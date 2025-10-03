import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@selcuk-karateke.de' },
        update: {},
        create: {
            name: 'Selçuk Karateke',
            email: 'admin@selcuk-karateke.de',
            password: hashedPassword,
            emailVerified: new Date(),
        },
    })

    console.log('✅ Admin user created:', adminUser.email)

    // Create sample projects
    const projects = [
        {
            title: 'Portfolio Website',
            description: 'Eine moderne Portfolio-Website mit Next.js, TypeScript und Tailwind CSS. Features: CMS, Blog, Kontaktformular und responsive Design.',
            technologies: 'Next.js,TypeScript,Tailwind CSS,Prisma,PostgreSQL',
            githubUrl: 'https://github.com/selcuk-karateke/portfolio',
            liveUrl: 'https://selcuk-karateke.dev',
            featured: true
        },
        {
            title: 'ERP-System Erweiterung',
            description: 'Erweiterung eines bestehenden ERP-Systems mit neuen Modulen für Lagerverwaltung, Kontenverwaltung und Personenverwaltung.',
            technologies: 'PHP,Laravel,MySQL,Vue.js,Bootstrap',
            featured: true
        },
        {
            title: 'Matching Tool',
            description: 'Ein intelligentes Matching-Tool zur Verknüpfung von Kunden mit passenden Dienstleistungen basierend auf Algorithmen.',
            technologies: 'Java,Spring Boot,PostgreSQL,React,Material-UI',
            featured: true
        }
    ]

    for (const project of projects) {
        await prisma.project.upsert({
            where: { title: project.title },
            update: {},
            create: project,
        })
    }

    console.log('✅ Sample projects created')

    // Create sample skills
    const skills = [
        { name: 'PHP', category: 'Backend', level: 5 },
        { name: 'JavaScript', category: 'Frontend', level: 5 },
        { name: 'Laravel', category: 'Framework', level: 4 },
        { name: 'Vue.js', category: 'Framework', level: 4 },
        { name: 'React', category: 'Framework', level: 3 },
        { name: 'Next.js', category: 'Framework', level: 3 },
        { name: 'TypeScript', category: 'Language', level: 3 },
        { name: 'SQL', category: 'Database', level: 4 },
        { name: 'Git', category: 'Tools', level: 4 },
        { name: 'Docker', category: 'DevOps', level: 3 },
        { name: 'Linux', category: 'System', level: 4 },
        { name: 'AWS', category: 'Cloud', level: 2 },
    ]

    for (const skill of skills) {
        await prisma.skill.upsert({
            where: { name: skill.name },
            update: {},
            create: skill,
        })
    }

    console.log('✅ Sample skills created')

    // Create sample experience
    const experiences = [
        {
            company: 'Bagobag GmbH',
            position: 'PHP-Entwickler',
            description: 'Entwicklung von PHP-basierten Webanwendungen mit Fokus auf Produktmanagement und HTML5. Arbeit mit modernen Frameworks und Technologien.',
            startDate: new Date('2020-01-01'),
            current: true,
            location: 'Berlin'
        },
        {
            company: 'Comhard GmbH',
            position: 'Fachinformatiker Anwendungsentwicklung (Umschulung)',
            description: 'Umschulung zum Fachinformatiker mit IHK-Prüfung. Spezialisierung: Anwendungsentwicklung. 2.640 Ausbildungsstunden in 9 Modulen: Betrieb und Geschäftsprozesse, Kommunikation, IT-Systeme, Vernetzte IT-Systeme, Anwendungsentwicklung (Java, C#, PHP, HTML/CSS, Datenbanken), Projektarbeit und betriebliches Praktikum.',
            startDate: new Date('2017-01-01'),
            endDate: new Date('2019-12-31'),
            current: false,
            location: 'Berlin'
        }
    ]

    for (const experience of experiences) {
        await prisma.experience.upsert({
            where: {
                company_position: {
                    company: experience.company,
                    position: experience.position
                }
            },
            update: {},
            create: experience,
        })
    }

    console.log('✅ Sample experience created')

    // Create sample blog post
    await prisma.post.upsert({
        where: { slug: 'willkommen-im-blog' },
        update: {},
        create: {
            title: 'Willkommen im Blog',
            slug: 'willkommen-im-blog',
            content: '<p>Willkommen in meinem neuen Blog! Hier werde ich regelmäßig über Webentwicklung, Blockchain-Technologien und meine Projekte schreiben.</p><p>Ich freue mich darauf, meine Erfahrungen und Erkenntnisse mit Ihnen zu teilen.</p>',
            excerpt: 'Willkommen in meinem neuen Blog! Hier werde ich regelmäßig über Webentwicklung, Blockchain-Technologien und meine Projekte schreiben.',
            published: true,
            featured: true,
            tags: 'Willkommen,Blog,Webentwicklung',
            authorId: adminUser.id,
        },
    })

    console.log('✅ Sample blog post created')

    // Create sample certifications
    const certifications = [
        {
            name: 'PHP Frameworks Laravel Vue React',
            issuer: 'BTA GmbH',
            issueDate: new Date('2020-08-01'),
            credentialId: null,
            credentialUrl: null
        },
        {
            name: 'UI/UX Design',
            issuer: 'BTA GmbH',
            issueDate: new Date('2020-07-01'),
            credentialId: null,
            credentialUrl: null
        },
        {
            name: 'Agile Beratung / Agiles Management',
            issuer: 'BTA GmbH',
            issueDate: new Date('2020-06-01'),
            credentialId: null,
            credentialUrl: null
        },
        {
            name: 'Software Development Fundamentals',
            issuer: 'Certiport - A Pearson VUE Business',
            issueDate: new Date('2018-10-01'),
            credentialId: 'v8dm-XVN9',
            credentialUrl: null
        },
        {
            name: 'Database Administration Fundamentals',
            issuer: 'Certiport - A Pearson VUE Business',
            issueDate: new Date('2018-03-01'),
            credentialId: 'wdeU5-HaMm',
            credentialUrl: null
        },
        {
            name: 'Microsoft Specialist: Windows 7',
            issuer: 'Microsoft',
            issueDate: new Date('2015-12-01'),
            credentialId: 'F503-5040',
            credentialUrl: null
        },
        {
            name: 'Netzwerkadministrator',
            issuer: 'dama.go GmbH',
            issueDate: new Date('2012-08-01'),
            credentialId: null,
            credentialUrl: null
        },
        {
            name: 'Microsoft Certified Professional',
            issuer: 'Microsoft',
            issueDate: new Date('2012-05-01'),
            credentialId: 'E924-7529',
            credentialUrl: null
        }
    ]

    for (const cert of certifications) {
        try {
            await prisma.certification.create({
                data: cert,
            })
        } catch {
            // Skip if already exists
            console.log(`Certification ${cert.name} already exists, skipping...`)
        }
    }

    console.log('✅ Sample certifications created')

    console.log('🎉 Database seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
