'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { PageHeader } from "@/components/PageHeader";

interface MemberLink {
	label: string;
	url: string;
}

interface MemberPublication {
	title: string;
	authors?: string;
	meta?: string;
}

interface MemberDetails {
	about?: string;
	researchFocus?: string[];
	education?: string;
	researchInterests?: string[];
	academicMetrics?: string;
	experience?: string;
	publicationsSummary?: string;
	awards?: string;
	collaborators?: string[];
	notablePublications?: MemberPublication[];
	links?: MemberLink[];
}

interface Member {
	id: string;
	image?: string;
	name: string;
	role: string;
	focus: string;
	details?: MemberDetails;
}

const MEMBERS: Member[] = [
	{
		id: "swarup-ghosh",
		image: "assets/img/profile_pictures/swarup-kumar-ghosh.jpg",
		name: "Dr. Swarup Kumar Ghosh",
		role: "Associate Professor",
		focus: "Medical Image Analysis, Soft Computing, Bioinformatics",
		details: {
			about:
				"Associate Professor of Computer Science & Engineering at Sister Nivedita University focusing on medical imaging, fuzzy soft set theory, and AI-driven diagnostics.",
			researchFocus: ["Medical Image Analysis", "Soft Computing", "Bioinformatics", "Deep Learning"],
			education: "Ph.D. in CSE – MAKAUT, WB; M.Tech (IT) – University of Calcutta",
			researchInterests: ["Medical Image Analysis", "Bioinformatics", "Soft Computing", "Deep Learning", "Computer Vision"],
			academicMetrics: "Google Scholar reports 850+ citations, h-index 18, i10-index 30 (profile accessed November 2025).",
			notablePublications: [
				{
					title: "3D MRI Segmentation using U-Net Architecture for the detection of Brain Tumor",
					authors: "S Sangui, T Iqbal, PC Chandra, SK Ghosh, A Ghosh",
					meta: "Multimedia Systems 29(4) (2023) • 45 citations",
				},
				{
					title:
						"A novel intuitionistic fuzzy soft set entrenched mammogram segmentation under multigranulation approximation for breast cancer detection in early stages",
					authors: "SK Ghosh, A Mitra, A Ghosh",
					meta: "Expert Systems with Applications 169 (2021), 114329 • 34 citations",
				},
				{
					title:
						"Recognition of cancer mediating biomarkers using rough approximations enabled intuitionistic fuzzy soft sets based similarity measure",
					authors: "SK Ghosh, A Ghosh, S Bhattacharyya",
					meta: "Applied Soft Computing 124 (2022), 109052 • 26 citations",
				},
				{
					title: "A novel retinal image segmentation using rSVM boosted convolutional neural network for exudates detection",
					authors: "SK Ghosh, A Ghosh",
					meta: "Biomedical Signal Processing and Control 68 (2021) • 23 citations",
				},
				{
					title: "SDCA: A Novel Stack Deep Convolutional Autoencoder - An Application on Retinal Image Denoising",
					authors: "SK Ghosh, B Biswas, A Ghosh",
					meta: "IET Image Processing (2019) • 23 citations",
				},
				{
					title: "Chest X-ray Enhancement to Interpret Pneumonia Malformation based on Fuzzy Soft Set and Dempster-Shafer theory of Evidence",
					authors: "B Biswas, SK Ghosh, S Bhattacharyya, J Platos, V Snasel, A Chakrabarti",
					meta: "Applied Soft Computing (2019) • 22 citations",
				},
			],
			links: [
				{ label: "Email", url: "mailto:swarup.ghosh@snu.edu.in" },
				{ label: "Google Scholar", url: "https://scholar.google.com/citations?user=1NU_3oEAAAAJ&hl=en" },
			],
		},
	},
	{
		id: "sayani-mondal",
		image: "assets/img/profile_pictures/sayani-mondal-cse.jpg",
		name: "Dr. Sayani Mondal",
		role: "Assistant Professor",
		focus: "NLP, Software Engineering, Program Comprehension, ML",
		details: {
			about:
				"Assistant Professor in Computer Science & Engineering at Sister Nivedita University, examining human factors in software engineering, program comprehension, and NLP-powered development tools.",
			researchFocus: ["Natural Language Processing", "Human Factors in Software Engineering", "Program Comprehension", "Machine Learning"],
			education: "Ph.D. in Computer Science",
			researchInterests: ["Program Comprehension", "Eye-gaze Analytics", "Developer Productivity", "Applied NLP"],
			notablePublications: [
				{
					title: "A survey-based study to understand various aspects of Kanban",
					authors: "A Kumar, N Kumar, S Mondal, T Biswas",
					meta: "Communication and Intelligent Systems (ICCIS 2021) • 2022 • 5 citations",
				},
				{
					title: "Measuring code comprehension effort using code reading pattern",
					authors: "S Mondal, PP Das, T Bhattacharjee Rudra",
					meta: "Sādhanā 47(3) (2022), Article 117 • 4 citations",
				},
				{
					title: "Effectiveness of test-driven development as an SDLC model: A case study of an elevator controller design",
					authors: "S Mondal, PP Das",
					meta: "Emerging Trends in Computing and Communication (ETCC 2014) • 4 citations",
				},
				{
					title: "An IDE-agnostic system to capture reading behaviour of C++ programs using eye-gaze tracker",
					authors: "S Mondal, PP Das",
					meta: "NCVPRIPG 2015 • 3 citations",
				},
				{
					title: "HCAT-Net: A Novel Hierarchical Cross-Attention Transformer Network with Enriched Balanced Ordinal Loss for EEG Emotion Classification",
					authors: "S Bharati, S Banerjee, S Mandal, SK Ghosh, S Mondal, A Mitra",
					meta: "International Conference on Computing, Intelligence, and Applications 2025",
				},
				{
					title: "A Study on Education System in India Pre-and Post-digitization",
					authors: "A Acharya, R Paul, S Mondal, C Mallick, A Chatterjee",
					meta: "International Conference on Data Mining and Information Security (2024)",
				},
			],
			academicMetrics: "Google Scholar reports single-digit citation counts across recent program comprehension studies (profile accessed November 2025).",
			links: [
				{ label: "Email", url: "mailto:sayani.mondal@snu.edu.in" },
				{ label: "Google Scholar", url: "https://scholar.google.com/citations?hl=en&user=AcyJPE0AAAAJ" },
			],
		},
	},
	{
		id: "anirban-mitra",
		image: "assets/img/profile_pictures/Anirban-Mitra.jpg",
		name: "Dr. Anirban Mitra",
		role: "Professor and HOD",
		focus: "Medical Imaging, Vision, Cryptography",
		details: {
			about:
				"Professor of Computer Science & Engineering at Sister Nivedita University with work spanning medical image vision, retinal analytics, cryptography, and intelligent systems for healthcare and agriculture.",
			researchFocus: ["Medical Image Vision", "Image Processing", "Cryptography", "Intelligent Systems"],
			education: "Ph.D. in Computer Science",
			researchInterests: ["Retinal Image Analysis", "Deep Learning", "Fault-tolerant Systems", "Smart Agriculture"],
			academicMetrics: "Google Scholar lists multiple medical imaging papers with 70+ citations (profile accessed November 2025).",
			notablePublications: [
				{
					title: "Enhancement and Restoration of non-uniform illuminated Fundus Image of Retina obtained through thin layer of Cataract",
					authors: "A Mitra, S Roy, S Roy, SK Setua",
					meta: "Computer Methods and Programs in Biomedicine 156 (2018) • 76 citations",
				},
				{
					title: "The region of interest localization for glaucoma analysis from retinal fundus image using deep learning",
					authors: "A Mitra, PS Banerjee, S Roy, S Roy, SK Setua",
					meta: "Computer Methods and Programs in Biomedicine 165 (2018), 25-35 • 66 citations",
				},
				{
					title: "Blood Vessel Segmentation of Retinal Image using Clifford Matched Filter and Clifford Convolution",
					authors: "SKS Somasis Roy, A Mitra, S Roy",
					meta: "Multimedia Tools and Applications (2019) • 44 citations",
				},
				{
					title: "A smart, sensible agriculture system using the exponential moving average model",
					authors: "T Kim, VS Solanki, HJ Baraiya, A Mitra, H Shah, S Roy",
					meta: "Symmetry 12(3) (2020), 457 • 35 citations",
				},
				{
					title: "Gossip-based fault-tolerant load balancing algorithm with low communication overhead",
					authors: "M Chatterjee, A Mitra, SK Setua, S Roy",
					meta: "Computers & Electrical Engineering 81 (2020), 106517 • 15 citations",
				},
				{
					title: "Efficacy of intra-umbilical oxytocin in the management of retained placenta: A randomized controlled trial",
					authors: "A Samanta, SG Roy, PK Mistri, A Mitra, R Pal, A Naskar, SK Bhattacharya, ...",
					meta: "Journal of Obstetrics and Gynaecology Research 39(1) (2013), 75-82 • 15 citations",
				},
				{
					title: "Estimation of air quality index from seasonal trends using deep neural network",
					authors: "A Sharma, A Mitra, S Sharma, S Roy",
					meta: "International Conference on Artificial Neural Networks (2018), 511-521 • 13 citations",
				},
			],
			links: [{ label: "Email", url: "mailto:anirban.mitra@snu.edu.in" }],
		},
	},
	{
		id: "soumedhik-bharati",
		image: "assets/img/profile_pictures/soumedhik-bharati.jpeg",
		name: "Soumedhik Bharati",
		role: "Research Student",
		focus: "Computer Vision and NLP",
		details: {
			about: "Soumedhik investigates multimodal learning systems that reason jointly over vision and language cues.",
			researchFocus: ["Computer Vision", "Natural Language Processing"],
			education: "M.Tech Candidate, SNU",
			researchInterests: ["Multimodal Learning", "Vision-Language Models"],
			links: [{ label: "Email", url: "mailto:soumedhik.bharati@snu.edu.in" }],
		},
	},
	{
		id: "sohoomlal-banerjee",
		image: "assets/img/profile_pictures/sohoomlal-banerjee.jpeg",
		name: "Sohoomlal Banerjee",
		role: "Research Student",
		focus: "Computer Vision and NLP",
		details: {
			about: "Sohoomlal prototypes human-centered AI assistants for knowledge discovery across images and documents.",
			researchFocus: ["Computer Vision", "Natural Language Processing"],
			education: "M.Tech Candidate, SNU",
			researchInterests: ["Generative AI", "Information Retrieval"],
			links: [{ label: "Email", url: "mailto:sohoomlal.banerjee@snu.edu.in" }],
		},
	},
	{
		id: "shibam-mandal",
		image: "assets/img/profile_pictures/shibam-mandal.png",
		name: "Shibam Mandal",
		role: "Research Student",
		focus: "Computer Vision",
		details: {
			about: "Shibam focuses on robust perception stacks for autonomous aerial and ground robots.",
			researchFocus: ["Computer Vision", "Robotics"],
			education: "B.Tech Honours, SNU",
			researchInterests: ["3D Perception", "Robot Navigation"],
			links: [{ label: "Email", url: "mailto:shibam.mandal@snu.edu.in" }],
		},
	},
	{
		id: "sohan-das",
		image: "assets/img/profile_pictures/sohan-das.jpeg",
		name: "Sohan Das",
		role: "Research Student",
		focus: "Computer Vision",
		details: {
			about: "Sohan builds efficient neural architectures for on-device scene understanding.",
			researchFocus: ["Computer Vision", "Edge AI"],
			education: "B.Tech Honours, SNU",
			researchInterests: ["Edge Computing", "Object Detection"],
			links: [{ label: "Email", url: "mailto:sohan.das@snu.edu.in" }],
		},
	},
	{
		id: "ahana-dasgupta",
		image: "assets/img/profile_pictures/ahana-dasgupta.png",
		name: "Ahana Dasgupta",
		role: "Research Student",
		focus: "Data Analytics, Data Visualization, Machine Learning, Deep Learning",
		details: {
			about:
				"Computer science engineering student building AI and software solutions with a focus on data analysis, visualization, and solving real-world problems through responsible, transparent systems.",
			researchFocus: ["Data Analytics", "Data Visualization", "Machine Learning", "Deep Learning"],
			education: "B.Tech CSE, Year 3 (Section 6) – Sister Nivedita University",
			researchInterests: ["Transparent AI", "Responsible ML", "Computational Thinking", "System Design"],
			links: [
				{ label: "Email", url: "mailto:ahanadasgupta26@gmail.com" },
				{ label: "Google Scholar", url: "https://scholar.google.com/citations?hl=en&user=pw9evpAAAAAJ" },
				{ label: "LinkedIn", url: "https://www.linkedin.com/in/ahana-dasgupta-332270284" },
			],
		},
	},
	{
		id: "anusha-gupta",
		image: "assets/img/profile_pictures/anusha-gupta.png",
		name: "Anusha Gupta",
		role: "Research Student",
		focus: "Web Development, Python, Frontend/UI-UX, Cybersecurity, ML/AI",
		details: {
			about:
				"Third-year B.Tech student who learns by building—mixing web development, Python, front-end design, and practical security projects while keeping curiosity across ML/AI and creative hobbies.",
			researchFocus: ["Web Development", "Python", "Front-end/UI-UX", "Cybersecurity", "Machine Learning & AI"],
			education: "B.Tech CSE, Year 3 (Section 6) – Sister Nivedita University",
			researchInterests: ["Full-stack Prototyping", "Design Systems", "Hands-on Security", "Applied ML"],
			links: [
				{ label: "Email", url: "mailto:anusha73gupta@gmail.com" },
				{ label: "LinkedIn", url: "https://www.linkedin.com/in/anusha-gupta-ofc" },
			],
		},
	},
	{
		id: "prithwish-ghosh",
		image: "assets/img/profile_pictures/prithwish-ghosh.png",
		name: "Prithwish Ghosh",
		role: "Research Student",
		focus: "NLP, Computational Biology, Theoretical CS, ML",
		details: {
			about:
				"Research-driven computer engineering undergraduate exploring computational biology, machine learning systems, and theoretical computer science to build intelligent, privacy-preserving, and transparent AI architectures.",
			researchFocus: ["Natural Language Processing", "Computational Biology", "Theoretical Computer Science", "Machine Learning"],
			education: "B.Tech CSE, Year 2 (Section 1) – Sister Nivedita University",
			researchInterests: ["Privacy-preserving AI", "Transparent ML Systems", "Computational Reasoning", "Systems Design"],
			links: [
				{ label: "Email", url: "mailto:prithwishg95@gmail.com" },
				{ label: "LinkedIn", url: "https://linkedin.com/in/prithwish-ghosh-ml" },
			],
		},
	},
	{
		id: "rupam-neogi",
		image: "assets/img/profile_pictures/rupam-neogi.jpg",
		name: "Rupam Neogi",
		role: "Research Student",
		focus: "Reinforcement Learning & Machine Learning",
		details: {
			about:
				"B.Tech student diving into machine learning and reinforcement learning while staying curious about emerging ideas that push intelligent systems forward.",
			researchFocus: ["Machine Learning", "Reinforcement Learning"],
			education: "B.Tech CSE, Year 2 (Section 1) – Sister Nivedita University",
			researchInterests: ["Reinforcement Learning", "Innovative ML Ideas"],
			links: [
				{ label: "Email", url: "mailto:planticed@gmail.com" },
				{ label: "LinkedIn", url: "https://www.linkedin.com/in/rupam-neogi-bb8734353" },
			],
		},
	},
	{
		id: "sinjini-ghosh",
		image: "assets/img/profile_pictures/sinjini-ghosh.png",
		name: "Sinjini Ghosh",
		role: "Research Student",
		focus: "Front-end Development, UI/UX Design, Graphic Design",
		details: {
			about:
				"Tech-focused student who enjoys crafting interfaces where design, user experience, and front-end engineering come together to feel effortless.",
			researchFocus: ["Front-end Development", "UI/UX Design", "Graphic Design"],
			education: "B.Tech CSE, Year 3 (Section 6) – Sister Nivedita University",
			researchInterests: ["Design Systems", "Interaction Design", "Creative Coding"],
			links: [
				{ label: "Email", url: "mailto:altoclef777@gmail.com" },
				{ label: "LinkedIn", url: "https://www.linkedin.com/in/sinjini-ghosh-45b58a284" },
			],
		},
	},
	{
		id: "subham-majumdar",
		image: "assets/img/profile_pictures/subham-majumdar.jpeg",
		name: "Subham Majumdar",
		role: "Research Student",
		focus: "NLP, ML, Quantum ML",
		details: {
			about:
				"B.Tech student specializing in AI & ML with interests spanning NLP, ML, and quantum machine learning—bringing internship and consultancy experience to build applied, intelligent systems with emerging tech.",
			researchFocus: ["Natural Language Processing", "Machine Learning", "Quantum Machine Learning"],
			education: "B.Tech CSE (AI & ML), Year 2 (Section 6) – Sister Nivedita University",
			researchInterests: ["Applied ML", "Intelligent Systems", "Emerging Technologies", "Quantum Computing"],
			links: [
				{ label: "Email", url: "mailto:subhammajumdar.09123@gmail.com" },
				{ label: "LinkedIn", url: "https://www.linkedin.com/in/subham-majumdar-19a403244" },
			],
		},
	},
	{
		id: "sneha-kundu",
		name: "Sneha Kundu",
		role: "Research Student",
		focus: "Data Centric AI, Applied ML",
		details: {
			about: "Sneha prototypes data curation loops and deployment playbooks for AI products in healthcare and civic tech.",
			researchFocus: ["Data Centric AI", "Applied Machine Learning"],
			education: "M.Tech Candidate, SNU",
			researchInterests: ["Dataset Engineering", "Operational ML", "Product Analytics"],
			links: [{ label: "Email", url: "mailto:sneha.kundu@snu.edu.in" }],
		},
	},
];

export default function PeoplePage() {
	const [activeMember, setActiveMember] = useState<Member | null>(null);

	const handleOpen = (member: Member) => {
		setActiveMember(member);
	};

	const handleClose = () => {
		setActiveMember(null);
	};

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-12 lg:px-0">
			<PageHeader
				title="People"
				description="Meet the brilliant minds driving innovation in machine learning research at AetherSaga."
			/>

			<section>
				<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Members</h2>
				<div className="mt-6 grid gap-6 md:grid-cols-2">
					{MEMBERS.map((member) => (
						<button
							type="button"
							key={member.id}
							onClick={()=>handleOpen(member)}
							className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-400/60 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700"
						>
							<div className="flex items-center gap-4">
								{member.image ? (
									<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
										<Image
											src={`/${member.image.replace(/^\//, "")}`}
											alt={member.name}
											width={64}
											height={64}
											sizes="64px"
											className="h-full w-full object-cover"
										/>
									</div>
								) : null}
								<div>
									<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{member.name}</h3>
									<p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
										{member.role}
									</p>
								</div>
							</div>
							<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{member.focus}</p>
						</button>
						))}
					</div>
			</section>

			<section>
				<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Visiting Researchers</h2>
				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<article className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/20 dark:text-slate-300">
						There are currently no visiting researchers associated with us.
					</article>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Alumni</h2>
				<div className="mt-6 grid gap-6 md:grid-cols-2">
					<article className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/20 dark:text-slate-300">
						There are currently no alumni associated with us.
					</article>
				</div>
			</section>

			{activeMember ? <ProfileModal member={activeMember} onClose={handleClose} /> : null}
		</div>
	);
}

interface ProfileModalProps {
	member: Member;
	onClose: () => void;
}

function ProfileModal({ member, onClose }: ProfileModalProps) {
	const headingId = useMemo(() => `profile-${member.id}-title`, [member.id]);

	useEffect(() => {
		if (typeof document === "undefined") {
			return undefined;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	if (typeof document === "undefined") {
		return null;
	}

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
			<div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={onClose} />
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={headingId}
				className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-950"
			>
				<div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
					<div className="flex items-start gap-4">
						{member.image ? (
							<div className="relative hidden h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:block dark:border-slate-800 dark:bg-slate-900">
								<Image
									src={`/${member.image.replace(/^\//, "")}`}
									alt={member.name}
									width={80}
									height={80}
									sizes="80px"
									className="h-full w-full object-cover"
								/>
							</div>
						) : null}
						<div>
							<h2 id={headingId} className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
								{member.name}
							</h2>
							<p className="mt-1 text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
								{member.role}
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full border border-transparent bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus-visible:ring focus-visible:ring-slate-400/70 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
					>
						Close
					</button>
				</div>
				<div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
					{member.details?.about ? (
						<section className="space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">About</h3>
							<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
								{member.details.about}
							</p>
						</section>
					) : null}

					{member.details?.researchFocus?.length ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Research Focus</h3>
							<div className="flex flex-wrap gap-2">
								{member.details.researchFocus.map((topic) => (
									<span
										key={topic}
										className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
									>
										{topic}
									</span>
								))}
							</div>
						</section>
					) : null}

					{member.details?.education ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Education</h3>
							<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
								{member.details.education}
							</p>
						</section>
					) : null}

					{member.details?.researchInterests?.length ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Research Interests</h3>
							<ul className="grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
								{member.details.researchInterests.map((interest) => (
									<li key={interest} className="rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
										{interest}
									</li>
								))}
							</ul>
						</section>
					) : null}

					{member.details?.academicMetrics ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Academic Metrics</h3>
							<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
								{member.details.academicMetrics}
							</p>
						</section>
					) : null}

					{member.details?.experience ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Experience</h3>
							<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
								{member.details.experience}
							</p>
						</section>
					) : null}

					{member.details?.publicationsSummary ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Publications</h3>
							<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
								{member.details.publicationsSummary}
							</p>
						</section>
					) : null}

					{member.details?.awards ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Awards & Recognition</h3>
							<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
								{member.details.awards}
							</p>
						</section>
					) : null}

					{member.details?.collaborators?.length ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Key Collaborators</h3>
							<ul className="grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
								{member.details.collaborators.map((collaborator) => (
									<li key={collaborator} className="rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
										{collaborator}
									</li>
								))}
							</ul>
						</section>
					) : null}

					{member.details?.notablePublications?.length ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Notable Publications</h3>
							<ul className="space-y-4">
								{member.details.notablePublications.map((publication) => (
									<li
										key={publication.title}
										className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
									>
										<p className="font-semibold text-slate-900 dark:text-slate-100">{publication.title}</p>
										{publication.authors ? (
											<p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
												{publication.authors}
											</p>
										) : null}
										{publication.meta ? (
											<p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{publication.meta}</p>
										) : null}
									</li>
								))}
							</ul>
						</section>
					) : null}

					{member.details?.links?.length ? (
						<section className="mt-6 space-y-3">
							<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Connect</h3>
							<div className="flex flex-wrap gap-3">
								{member.details.links.map((link) => (
									<a
										key={link.label}
										href={link.url}
										target={link.url.startsWith("http") ? "_blank" : undefined}
										rel={link.url.startsWith("http") ? "noreferrer" : undefined}
										className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
									>
										{link.label}
									</a>
								))}
							</div>
						</section>
					) : null}
				</div>
			</div>
		</div>,
		document.body,
	);
}
