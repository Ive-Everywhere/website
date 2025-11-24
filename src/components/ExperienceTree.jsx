import React from 'react';
import SectionLabel from './SectionLabel';

const ExperienceTree = () => {
    // Mapping ecosystem
    const ecosystem = [
        {
            name: 'Apple_Ecosystem',
            type: 'folder',
            isOpen: true,
            children: [
                { name: 'iPhone_Primary.ios', type: 'file', meta: 'Background Recording' },
                { name: 'Watch_Ultra.os', type: 'file', meta: 'Dictation' },
                {
                    name: 'Services', type: 'folder', children: [
                        { name: 'Dynamic_Island.ui', type: 'file', meta: 'Personality' },
                        { name: 'Live_Activities', type: 'file', meta: 'Status' }
                    ]
                }
            ]
        },
        {
            name: 'Cloud_Sync',
            type: 'folder',
            isOpen: true,
            children: [
                {
                    name: 'iCloud_Container', type: 'folder', children: [
                        { name: 'transcripts.db', type: 'file' },
                        { name: 'drawings.svg', type: 'file' }
                    ]
                }
            ]
        }
    ];

    const TreeItem = ({ item, depth = 0 }) => (
        <div className="font-mono text-sm leading-7 transition-all duration-200" style={{ paddingLeft: `${depth * 24}px` }}>
            <div className="flex items-center gap-3 hover:bg-neutral-800/50 p-1 cursor-pointer group rounded select-none">
                <span className="text-neutral-600 font-light font-mono">{depth > 0 ? '├─' : '>'}</span>
                {item.type === 'folder' ? <span className="text-blue-300">DIR</span> : <span className="text-yellow-300">FILE</span>}
                <span className={item.type === 'folder' ? 'text-white font-bold group-hover:text-blue-300' : 'text-neutral-300 group-hover:text-white'}>
                    {item.name}
                </span>
                {item.meta && (
                    <span className="ml-auto text-neutral-600 text-xs hidden sm:block pr-4">// {item.meta}</span>
                )}
            </div>
            {item.children && item.children.map((child, idx) => (
                <TreeItem key={idx} item={child} depth={depth + 1} />
            ))}
        </div>
    );

    return (
        <section className="bg-gradient-to-b from-black to-[#050505] py-24 px-6 border-b border-neutral-900 min-h-[600px] flex flex-col justify-center">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Visual Tree */}
                <div>
                    <SectionLabel text="Device_Topology" />
                    <div className="bg-[#0c0c0c] border border-neutral-800 p-8 rounded-lg shadow-2xl relative overflow-hidden h-[500px] overflow-y-auto custom-scrollbar">
                        <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-mono font-bold text-neutral-700 pointer-events-none">
                            ./sys
                        </div>
                        {ecosystem.map((f, i) => <TreeItem key={i} item={f} />)}
                    </div>
                    <div className="mt-4 flex gap-4 text-xs font-mono text-neutral-500">
                        <span>[ SYNC ] ACTIVE</span>
                        <span>E2E_ENCRYPTED</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Text Context */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-mono text-white mb-6">Native Integration</h2>
                    <p className="text-neutral-400 font-mono mb-8 text-lg leading-relaxed">
                        Ive lives across your entire Apple ecosystem. From quirky animations in the Dynamic Island to seamless background recording on your Watch. It's not just an app; it's a layer of intelligence over your device.
                    </p>

                    <div className="p-6 border border-dashed border-neutral-700 bg-neutral-900/30">
                        <div className="text-green-400 font-mono text-sm mb-2">$ status --verbose</div>
                        <div className="text-neutral-300 font-mono text-sm">
                            &gt; Watch: Recording [ON]<br />
                            &gt; iPhone: Processing Context...<br />
                            &gt; iCloud: Upload Complete
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExperienceTree;
