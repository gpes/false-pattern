
package br.edu.ifpb.gpes.fp.detection.readers;

import br.edu.ifpb.gpes.shared.FalsePatternDetection;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author natan
 */
public class FileFalsePatternDetection {
    private File filePath;

    public FileFalsePatternDetection() {
        this(new File("../false-patterns/falsePatterns.json"));
    }

    public FileFalsePatternDetection(File filePath) {
        this.filePath = filePath;
    }
    
    public FalsePatternDetection readOutput() {
        FalsePatternDetection falsePatternDetection = new FalsePatternDetection();
        String content = "";
        try {
            content = new String(Files.readAllBytes(Paths.get(this.filePath.getPath())));
            
            ObjectMapper objectMapper = new ObjectMapper();
            falsePatternDetection = objectMapper.readValue(content, FalsePatternDetection.class);

        } catch (IOException ex) {
            Logger.getLogger(FileBenchmarking.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return falsePatternDetection;
    }
}
